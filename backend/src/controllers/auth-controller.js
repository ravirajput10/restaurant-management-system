import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ApiError } from "../middleware/error.js";
import config from "../config/config.js";
import crypto from "crypto";
import { blacklistToken, generateTokens } from "../services/token-service.js";

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
        ...generateTokens(user._id.toString(), user.role), // destructuring the accessToken and refreshToken
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
    const { email, password, role } = req.body;

    // Check for user email
    const query = { email };
    
    // If role is provided, add it to the query
    if (role) {
      query.role = role;
    }
    
    // Check for user with matching email and role (if provided)
    const user = await User.findOne(query).select("+password");

    if (!user) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

    // Store refresh token hash in database
    user.refreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    await user.save();

    res.json({
      message: "User logged in successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
      refreshToken,
      // token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
// export const logout = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(200).json({ message: "Logged out successfully" });
//     }

//     // In a production environment, you might want to add the token to a blacklist
//     // This would require Redis or another fast storage solution
//     // Example: await redisClient.set(`bl_${token}`, token, 'EX', tokenRemainingTTL);

//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// Enhanced logout with token invalidation
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!refreshToken) {
      return next(new ApiError(400, 'Refresh token is required'));
    }

    // Invalidate refresh token in database
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await User.findOneAndUpdate(
      { refreshToken: refreshTokenHash },
      { $unset: { refreshToken: "" } }
    );

    // Blacklist access token if still valid
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, config.jwtSecret);
        const timeToExpiry = decoded.exp - Math.floor(Date.now() / 1000);

        if (timeToExpiry > 0) {
          await blacklistToken(accessToken, timeToExpiry);
        }
      } catch (error) {
        // Token already expired, no need to blacklist
      }
    }

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

// Add refresh token endpoint
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new ApiError(400, "Refresh token is required"));
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);

    // Find user with matching refresh token hash
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const user = await User.findOne({
      _id: decoded.id,
      refreshToken: refreshTokenHash,
    });

    if (!user) {
      return next(new ApiError(401, "Invalid refresh token"));
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};

