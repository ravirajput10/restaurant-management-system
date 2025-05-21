import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database';
import config from './config/config';
import logger from './config/logger';
import SocketService from './services/socket.service';
import { errorConverter, errorHandler, notFound } from './middleware/error';

// Routes
import authRoutes from './routes/auth.routes';
import orderRoutes from './routes/order.routes';
import reservationRoutes from './routes/reservation.routes';
import staffRoutes from './routes/staff.routes';

// Connect to MongoDB
connectDB();

// Initialize Express
const app: Express = express();
const server = http.createServer(app);

// Initialize Socket.io
const socketService = new SocketService(server);
app.set('io', socketService.getIO());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(helmet());
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
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
