import Reservation from '../models/reservation.model.js';
import { ApiError } from '../middleware/error.js';

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private
export const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get reservations by date
// @route   GET /api/reservations/date/:date
// @access  Private
export const getReservationsByDate = async (req, res, next) => {
  try {
    const dateStr = req.params.date;
    const date = new Date(dateStr);
    
    // Set time to beginning of day
    date.setHours(0, 0, 0, 0);
    
    // Create end date (end of the same day)
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const reservations = await Reservation.find({
      date: { $gte: date, $lte: endDate },
    }).sort({ time: 1 });
    
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private
export const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return next(new ApiError(404, 'Reservation not found'));
    }

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new reservation
// @route   POST /api/reservations
// @access  Private
export const createReservation = async (req, res, next) => {
  try {
    const {
      customerName,
      date,
      time,
      guests,
      tableNumber,
      specialRequests,
      contactPhone,
      contactEmail,
    } = req.body;

    const reservation = await Reservation.create({
      customerName,
      date,
      time,
      guests,
      status: 'PENDING',
      tableNumber,
      specialRequests,
      contactPhone,
      contactEmail,
    });

    // Emit socket event for new reservation
    req.app.get('io').emit('newReservation', reservation);

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id/status
// @access  Private
export const updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return next(new ApiError(404, 'Reservation not found'));
    }

    reservation.status = status;
    const updatedReservation = await reservation.save();

    // Emit socket event for reservation status update
    req.app.get('io').emit('reservationStatusUpdate', {
      reservationId: reservation._id,
      status: reservation.status,
    });

    res.json(updatedReservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private
export const updateReservation = async (req, res, next) => {
  try {
    const {
      customerName,
      date,
      time,
      guests,
      status,
      tableNumber,
      specialRequests,
      contactPhone,
      contactEmail,
    } = req.body;

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return next(new ApiError(404, 'Reservation not found'));
    }

    if (customerName) reservation.customerName = customerName;
    if (date) reservation.date = new Date(date);
    if (time) reservation.time = time;
    if (guests) reservation.guests = guests;
    if (status) reservation.status = status;
    if (tableNumber) reservation.tableNumber = tableNumber;
    if (specialRequests !== undefined) reservation.specialRequests = specialRequests;
    if (contactPhone) reservation.contactPhone = contactPhone;
    if (contactEmail !== undefined) reservation.contactEmail = contactEmail;

    const updatedReservation = await reservation.save();

    // Emit socket event for reservation update
    req.app.get('io').emit('reservationUpdate', updatedReservation);

    res.json(updatedReservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private
export const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return next(new ApiError(404, 'Reservation not found'));
    }

    await reservation.deleteOne();

    // Emit socket event for reservation deletion
    req.app.get('io').emit('reservationDelete', req.params.id);

    res.json({ message: 'Reservation removed' });
  } catch (error) {
    next(error);
  }
};
