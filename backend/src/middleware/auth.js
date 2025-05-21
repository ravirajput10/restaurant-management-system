import jwt from 'jsonwebtoken';
import { ApiError } from './error.js';
import config from '../config/config.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Add user to request
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      next();
    } catch (error) {
      next(new ApiError(401, 'Not authorized, token failed'));
    }
  }

  if (!token) {
    next(new ApiError(401, 'Not authorized, no token'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized, no user'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `User role ${req.user.role} is not authorized to access this resource`)
      );
    }
    
    next();
  };
};
