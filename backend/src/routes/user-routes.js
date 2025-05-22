import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
} from '../controllers/user-controller.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate, userUpdateValidation, passwordChangeValidation } from '../middleware/validate.js';

const router = express.Router();

// Routes that require admin or manager role
router
  .route('/getAllUsers')
  .get(protect, authorize('admin', 'manager'), getAllUsers);

// Routes for specific user
router
  .route('/getUser/:id')
  .get(protect, getUserById)

router
  .route("/updateUser/:id") 
  .put(protect, validate(userUpdateValidation), updateUser)
  
router
  .route("/deleteUser/:id")
  .delete(protect, authorize('admin'), deleteUser);

// Password change route
router
  .route('/:id/password')
  .put(protect, validate(passwordChangeValidation), changePassword);

export default router;
