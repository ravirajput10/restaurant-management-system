import Restaurant from '../models/restaurant.js';
import logger from '../config/logger.js';

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
export const getRestaurants = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      cuisine,
      priceRange,
      rating,
      location,
      radius = 10, // km
    } = req.query;

    const query = { isActive: true };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by cuisine
    if (cuisine) {
      query.cuisine = { $in: cuisine.split(',') };
    }

    // Filter by price range
    if (priceRange) {
      query.priceRange = { $in: priceRange.split(',') };
    }

    // Filter by rating
    if (rating) {
      query['rating.average'] = { $gte: parseFloat(rating) };
    }

    // Location-based search
    if (location) {
      const [lng, lat] = location.split(',').map(Number);
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: radius * 1000, // Convert km to meters
        },
      };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        { path: 'owner', select: 'name email' },
        { path: 'staff.user', select: 'name email' },
      ],
      sort: search ? { score: { $meta: 'textScore' } } : { createdAt: -1 },
    };

    const restaurants = await Restaurant.paginate(query, options);

    res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    logger.error('Error getting restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('staff.user', 'name email');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Error getting restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Create restaurant
// @route   POST /api/restaurants
// @access  Private (Admin/Manager)
export const createRestaurant = async (req, res) => {
  try {
    // Add owner from authenticated user
    req.body.owner = req.user.id;

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Error creating restaurant:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Private (Owner/Admin)
export const updateRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    // Check ownership or admin role
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this restaurant',
      });
    }

    restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Error updating restaurant:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Private (Owner/Admin)
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    // Check ownership or admin role
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this restaurant',
      });
    }

    await Restaurant.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Restaurant deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Add staff to restaurant
// @route   POST /api/restaurants/:id/staff
// @access  Private (Owner/Admin)
export const addStaff = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    // Check ownership or admin role
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add staff to this restaurant',
      });
    }

    restaurant.staff.push(req.body);
    await restaurant.save();

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Error adding staff:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
