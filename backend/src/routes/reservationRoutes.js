import express from 'express';
import {
  getReservations,
  getReservationsByDate,
  getReservationById,
  createReservation,
  updateReservationStatus,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getReservations)
  .post(protect, createReservation);

router.route('/date/:date').get(protect, getReservationsByDate);

router
  .route('/:id')
  .get(protect, getReservationById)
  .put(protect, updateReservation)
  .delete(protect, authorize('admin', 'manager'), deleteReservation);

router.route('/:id/status').put(protect, updateReservationStatus);

export default router;
