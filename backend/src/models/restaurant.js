import mongoose, { Schema } from 'mongoose';

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a restaurant name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    address: {
      street: {
        type: String,
        required: [true, 'Please add a street address'],
      },
      city: {
        type: String,
        required: [true, 'Please add a city'],
      },
      state: {
        type: String,
        required: [true, 'Please add a state'],
      },
      zipCode: {
        type: String,
        required: [true, 'Please add a zip code'],
      },
      country: {
        type: String,
        required: [true, 'Please add a country'],
        default: 'USA',
      },
    },
    contact: {
      phone: {
        type: String,
        required: [true, 'Please add a phone number'],
      },
      email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
        ],
      },
      website: {
        type: String,
      },
    },
    cuisine: {
      type: [String],
      required: [true, 'Please add at least one cuisine type'],
    },
    priceRange: {
      type: String,
      enum: ['$', '$$', '$$$', '$$$$'],
      required: [true, 'Please add a price range'],
    },
    hours: {
      monday: { open: String, close: String, closed: { type: Boolean, default: false } },
      tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
      thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
      friday: { open: String, close: String, closed: { type: Boolean, default: false } },
      saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
      sunday: { open: String, close: String, closed: { type: Boolean, default: false } },
    },
    capacity: {
      type: Number,
      required: [true, 'Please add restaurant capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    tables: [{
      number: {
        type: String,
        required: true,
      },
      seats: {
        type: Number,
        required: true,
        min: [1, 'Table must have at least 1 seat'],
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    }],
    features: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Restaurant must have an owner'],
    },
    staff: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['manager', 'chef', 'waiter', 'host'],
        required: true,
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create index for location-based queries
restaurantSchema.index({ location: '2dsphere' });

// Create index for search functionality
restaurantSchema.index({ name: 'text', description: 'text', cuisine: 'text' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
