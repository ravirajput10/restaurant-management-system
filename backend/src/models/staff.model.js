import mongoose, { Schema } from 'mongoose';

const staffSchema = new Schema(
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
      default: Date.now,
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

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
