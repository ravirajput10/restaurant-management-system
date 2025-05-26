import { validationResult, body } from 'express-validator';
import { ApiError } from './error.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map(err => ({
      [err.param]: err.msg
    }));

    return next(new ApiError(400, 'Validation Error', extractedErrors));
  };
};

// Authentication validation schemas
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'staff', 'user'])
    .withMessage('Invalid role specified'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must include uppercase, lowercase, number and special character')
];

export const loginValidation = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'staff', 'user'])
    .withMessage('Invalid role specified')
];

// User validation schemas
export const userUpdateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Must be a valid email'),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'staff', 'user'])
    .withMessage('Invalid role specified')
];

export const passwordChangeValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must include uppercase, lowercase, number and special character')
];
