import express from 'express';
import { register, login, getMe, logout } from '../controllers/auth-controller.js';
import { protect } from '../middleware/auth.js';
import { validate, registerValidation, loginValidation } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;

