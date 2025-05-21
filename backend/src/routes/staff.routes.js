import express from 'express';
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaffStatus,
  updateStaff,
  deleteStaff,
} from '../controllers/staff.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllStaff)
  .post(protect, authorize('admin', 'manager'), createStaff);

router
  .route('/:id')
  .get(protect, getStaffById)
  .put(protect, authorize('admin', 'manager'), updateStaff)
  .delete(protect, authorize('admin'), deleteStaff);

router.route('/:id/status').put(protect, authorize('admin', 'manager'), updateStaffStatus);

export default router;
