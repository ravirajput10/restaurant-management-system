import logger from '../config/logger.js';

export const securityLogger = (req, res, next) => {
  // Log authentication attempts
  if (req.path.includes('/auth/login')) {
    logger.info('Authentication attempt', {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      email: req.body.email
    });
  }
  
  // Log access to sensitive endpoints
  if (req.path.includes('/admin') || req.path.includes('/staff')) {
    logger.info('Sensitive endpoint access', {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      path: req.path,
      method: req.method,
      userId: req.user?.id
    });
  }
  
  next();
};
