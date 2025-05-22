export const requireHttps = (req, res, next) => {
  // Skip for local development
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }
  
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  
  next();
};