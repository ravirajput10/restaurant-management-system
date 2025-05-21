import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem extends Document {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IOrder extends Document {
  orderId: string;
  customerName: string;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  items: IOrderItem[];
  total: number;
  tableNumber?: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }
);

const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    tableNumber: {
      type: String,
    },
    specialInstructions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order ID before saving
orderSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const count = await mongoose.model('Order').countDocuments();
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  this.orderId = `ORD-${year}${month}${day}-${(count + 1).toString().padStart(4, '0')}`;
  next();
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
