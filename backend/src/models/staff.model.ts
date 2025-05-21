import mongoose, { Document, Schema } from 'mongoose';

export interface IStaff extends Document {
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  joinDate: Date;
  department: string;
  position: string;
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const staffSchema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: [true, 'Please provide staff name'],
    },
    role: {
      type: String,
      required: [true, 'Please provide staff role'],
    },
    email: {
      type: String,
      required: [true, 'Please provide staff email'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide staff phone number'],
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'ON_LEAVE'],
      default: 'ACTIVE',
    },
    joinDate: {
      type: Date,
      required: [true, 'Please provide join date'],
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create index for efficient querying by department and status
staffSchema.index({ department: 1, status: 1 });

const Staff = mongoose.model<IStaff>('Staff', staffSchema);

export default Staff;
