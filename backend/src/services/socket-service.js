import { Server } from 'socket.io';
import logger from '../config/logger.js';
import config from '../config/config.js';

export default class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: config.corsOrigin,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.io.on('connection', (socket) => {
      logger.info(`New client connected: ${socket.id}`);

      // Join rooms based on client type
      socket.on('joinRoom', (room) => {
        socket.join(room);
        logger.info(`Client ${socket.id} joined room: ${room}`);
      });

      // Handle kitchen events
      socket.on('orderStatusChange', (data) => {
        this.io.emit('orderStatusUpdate', data);
        logger.info(`Order ${data.orderId} status changed to ${data.status}`);
      });

      // Handle reservation events
      socket.on('reservationStatusChange', (data) => {
        this.io.emit('reservationStatusUpdate', data);
        logger.info(`Reservation ${data.reservationId} status changed to ${data.status}`);
      });

      // Handle staff events
      socket.on('staffStatusChange', (data) => {
        this.io.emit('staffStatusUpdate', data);
        logger.info(`Staff ${data.staffId} status changed to ${data.status}`);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });
  }

  getIO() {
    return this.io;
  }
}
