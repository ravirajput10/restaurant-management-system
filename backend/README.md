# Restaurant Management System Backend

This is the backend service for the Restaurant Management System, built with Node.js, Express.js, TypeScript, and MongoDB.

## Features

- RESTful API for Orders, Reservations, and Staff management
- Authentication and authorization with JWT
- Real-time updates with WebSockets (Socket.io)
- MongoDB database integration
- Error handling and logging
- Rate limiting and security features
- Production-ready with PM2 process management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Create a `.env` file based on `.env.example` and configure your environment variables
5. Build the TypeScript code:

```bash
npm run build
# or
yarn build
```

## Running the Server

### Development Mode

```bash
npm run dev
# or
yarn dev
```

### Production Mode

```bash
npm run start
# or
yarn start
```

### Using PM2 (Production)

```bash
npm run pm2:start
# or
yarn pm2:start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user info

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete an order

### Reservations

- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/date/:date` - Get reservations by date
- `GET /api/reservations/:id` - Get reservation by ID
- `POST /api/reservations` - Create a new reservation
- `PUT /api/reservations/:id` - Update a reservation
- `PUT /api/reservations/:id/status` - Update reservation status
- `DELETE /api/reservations/:id` - Delete a reservation

### Staff

- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get staff by ID
- `POST /api/staff` - Create a new staff member
- `PUT /api/staff/:id` - Update a staff member
- `PUT /api/staff/:id/status` - Update staff status
- `DELETE /api/staff/:id` - Delete a staff member

## WebSocket Events

The backend uses Socket.io for real-time communication. The following events are available:

### Server to Client

- `newOrder` - Emitted when a new order is created
- `orderStatusUpdate` - Emitted when an order status is updated
- `orderUpdate` - Emitted when an order is updated
- `orderDelete` - Emitted when an order is deleted
- `newReservation` - Emitted when a new reservation is created
- `reservationStatusUpdate` - Emitted when a reservation status is updated
- `reservationUpdate` - Emitted when a reservation is updated
- `reservationDelete` - Emitted when a reservation is deleted
- `staffStatusUpdate` - Emitted when a staff status is updated

### Client to Server

- `joinRoom` - Join a specific room for targeted updates
- `orderStatusChange` - Change the status of an order
- `reservationStatusChange` - Change the status of a reservation
- `staffStatusChange` - Change the status of a staff member

## License

This project is licensed under the ISC License.
