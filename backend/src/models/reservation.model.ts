import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  date: Date;
  time: string;
  guests: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  tableNumber: string;
  specialRequests?: string;
  contactPhone: string;
  contactEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide reservation date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide reservation time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time in HH:MM format'],
    },
    guests: {
      type: Number,
      required: [true, 'Please provide number of guests'],
      min: 1,
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'PENDING', 'CANCELLED'],
      default: 'PENDING',
    },
    tableNumber: {
      type: String,
      required: [true, 'Please provide table number'],
    },
    specialRequests: {
      type: String,
    },
    contactPhone: {
      type: String,
      required: [true, 'Please provide contact phone number'],
    },
    contactEmail: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Create index for efficient querying by date
reservationSchema.index({ date: 1, status: 1 });

const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;
