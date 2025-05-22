import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import config from './config/config.js';
import logger from './config/logger.js';
import SocketService from './services/socket-service.js';
import { errorConverter, errorHandler, notFound } from './middleware/error.js';

// Routes
import authRoutes from './routes/auth-routes.js';
import orderRoutes from './routes/order-routes.js';
import reservationRoutes from './routes/reservation-routes.js';
import staffRoutes from './routes/staff-routes.js';
import userRoutes from './routes/user-routes.js';

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const socketService = new SocketService(server);
app.set('io', socketService.getIO());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Limit request body size
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hsts: { maxAge: 15552000, includeSubDomains: true },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
  noSniff: true
}));

// Disable X-Powered-By header
app.disable('x-powered-by');
app.use(compression());

// Logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/staff', staffRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: config.env });
});

// Error handling
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

// Start server
const PORT = config.port;
server.listen(PORT, () => {
  logger.info(`Server running in ${config.env} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;


