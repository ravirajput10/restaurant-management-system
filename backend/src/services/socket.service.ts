import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import logger from '../config/logger';
import config from '../config/config';

export default class SocketService {
  private io: Server;

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: config.corsOrigin,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.io.on('connection', (socket: Socket) => {
      logger.info(`New client connected: ${socket.id}`);

      // Join rooms based on client type
      socket.on('joinRoom', (room: string) => {
        socket.join(room);
        logger.info(`Client ${socket.id} joined room: ${room}`);
      });

      // Handle kitchen events
      socket.on('orderStatusChange', (data: { orderId: string; status: string }) => {
        this.io.emit('orderStatusUpdate', data);
        logger.info(`Order ${data.orderId} status changed to ${data.status}`);
      });

      // Handle reservation events
      socket.on('reservationStatusChange', (data: { reservationId: string; status: string }) => {
        this.io.emit('reservationStatusUpdate', data);
        logger.info(`Reservation ${data.reservationId} status changed to ${data.status}`);
      });

      // Handle staff events
      socket.on('staffStatusChange', (data: { staffId: string; status: string }) => {
        this.io.emit('staffStatusUpdate', data);
        logger.info(`Staff ${data.staffId} status changed to ${data.status}`);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });
  }

  public getIO(): Server {
    return this.io;
  }
}
