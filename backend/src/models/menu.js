import mongoose, { Schema } from 'mongoose';

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add an item name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add an item description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['appetizer', 'main', 'dessert', 'beverage', 'side', 'special'],
  },
  ingredients: {
    type: [String],
    default: [],
  },
  allergens: {
    type: [String],
    default: [],
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sodium: Number,
  },
  dietary: {
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false },
    dairyFree: { type: Boolean, default: false },
    nutFree: { type: Boolean, default: false },
  },
  images: {
    type: [String],
    default: [],
  },
  preparationTime: {
    type: Number, // in minutes
    required: [true, 'Please add preparation time'],
    min: [1, 'Preparation time must be at least 1 minute'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  spiceLevel: {
    type: String,
    enum: ['none', 'mild', 'medium', 'hot', 'very-hot'],
    default: 'none',
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
});

const menuSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Menu must belong to a restaurant'],
    },
    name: {
      type: String,
      required: [true, 'Please add a menu name'],
      trim: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'brunch', 'drinks', 'desserts', 'specials'],
      required: [true, 'Please specify menu type'],
    },
    items: [menuItemSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    availableFrom: {
      type: String, // Time format: "HH:MM"
    },
    availableTo: {
      type: String, // Time format: "HH:MM"
    },
    availableDays: {
      type: [String],
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    },
    seasonalMenu: {
      type: Boolean,
      default: false,
    },
    validFrom: {
      type: Date,
    },
    validTo: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
menuSchema.index({ 'items.name': 'text', 'items.description': 'text', 'items.category': 'text' });

// Create index for restaurant queries
menuSchema.index({ restaurant: 1, isActive: 1 });

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
