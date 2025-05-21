import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router
  .route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrder)
  .delete(protect, authorize('admin', 'manager'), deleteOrder);

router.route('/:id/status').put(protect, updateOrderStatus);

export default router;
