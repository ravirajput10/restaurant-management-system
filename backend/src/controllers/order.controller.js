import Order from '../models/order.model.js';
import { ApiError } from '../middleware/error.js';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, 'Order not found'));
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { customerName, items, tableNumber, specialInstructions } = req.body;

    // Calculate total and subtotals
    const processedItems = items.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    }));

    const total = processedItems.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await Order.create({
      customerName,
      items: processedItems,
      total,
      tableNumber,
      specialInstructions,
      status: 'PENDING',
    });

    // Emit socket event for new order
    req.app.get('io').emit('newOrder', order);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, 'Order not found'));
    }

    order.status = status;
    const updatedOrder = await order.save();

    // Emit socket event for order status update
    req.app.get('io').emit('orderStatusUpdate', {
      orderId: order._id,
      status: order.status,
    });

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
export const updateOrder = async (req, res, next) => {
  try {
    const { customerName, items, tableNumber, specialInstructions, status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, 'Order not found'));
    }

    // Calculate total and subtotals if items are provided
    if (items) {
      const processedItems = items.map((item) => ({
        ...item,
        subtotal: item.price * item.quantity,
      }));

      const total = processedItems.reduce((sum, item) => sum + item.subtotal, 0);

      order.items = processedItems;
      order.total = total;
    }

    if (customerName) order.customerName = customerName;
    if (tableNumber) order.tableNumber = tableNumber;
    if (specialInstructions) order.specialInstructions = specialInstructions;
    if (status) order.status = status;

    const updatedOrder = await order.save();

    // Emit socket event for order update
    req.app.get('io').emit('orderUpdate', updatedOrder);

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ApiError(404, 'Order not found'));
    }

    await order.deleteOne();

    // Emit socket event for order deletion
    req.app.get('io').emit('orderDelete', req.params.id);

    res.json({ message: 'Order removed' });
  } catch (error) {
    next(error);
  }
};
