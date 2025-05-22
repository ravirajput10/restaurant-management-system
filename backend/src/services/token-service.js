import jwt from "jsonwebtoken";
import Redis from "ioredis";
import config from "../config/config.js";

// Initialize Redis client
const redis = new Redis(config.redisUrl);

// Generate access and refresh tokens
export const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { id: userId, role },
    config.jwtSecret,
    { expiresIn: "60m" } // Short-lived access token
  );

  const refreshToken = jwt.sign({ id: userId }, config.jwtRefreshSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = async (token) => {
  try {
    // Check if token is blacklisted
    const isBlacklisted = await redis.exists(`bl_${token}`);
    if (isBlacklisted) {
      throw new Error("Token has been revoked");
    }

    // Verify token
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw error;
  }
};

export const blacklistToken = async (token, expirySeconds) => {
  try {
    // Add token to blacklist with expiry
    await redis.set(`bl_${token}`, "true", "EX", expirySeconds);
    return true;
  } catch (error) {
    throw error;
  }
};
