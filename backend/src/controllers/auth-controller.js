import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ApiError } from "../middleware/error.js";
import config from "../config/config.js";

// Generate JWT
const generateToken = (id, role) => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ApiError(400, "User already exists"));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString(), user.role),
      });
    } else {
      return next(new ApiError(400, "Invalid user data"));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    res.json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(200).json({ message: 'Logged out successfully' });
    }
    
    // In a production environment, you might want to add the token to a blacklist
    // This would require Redis or another fast storage solution
    // Example: await redisClient.set(`bl_${token}`, token, 'EX', tokenRemainingTTL);
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError(401, "Not authorized"));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
