import User from "../models/user.js";
import { ApiError } from "../middleware/error.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin/Manager
export const getAllUsers = async (req, res, next) => {
  try {
    // Add pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Add filtering
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    const users = await User.find(filter)
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin/Manager/Self
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Check if user is requesting their own profile or is admin/manager
    if (
      req.user.id !== user._id.toString() &&
      !["admin", "manager"].includes(req.user.role)
    ) {
      return next(
        new ApiError(403, "Not authorized to access this user profile")
      );
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile (including status)
// @route   PUT /api/users/:id
// @access  Private/Admin/Manager/Self
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, isActive } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Check if user is updating their own profile or is admin/manager
    // req.user is coming from protect route by decoding the token
    if (
      req.user.id !== user._id.toString() &&
      !["admin", "manager"].includes(req.user.role)
    ) {
      return next(
        new ApiError(403, "Not authorized to update this user profile")
      );
    }

    // Only allow admins to update role
    if (role && req.user.role !== "admin") {
      return next(new ApiError(403, "Only admins can update user roles"));
    }

    // Update fields
    const fieldsToUpdate = {
      name: name || user.name,
      email: email || user.email,
    };

    // Only admins can update roles and active status
    if (req.user.role === "admin") {
      if (role) fieldsToUpdate.role = role;
      if (isActive !== undefined) {
        // Prevent deactivating the last admin
        if (user.role === "admin" && !isActive) {
          const activeAdminCount = await User.countDocuments({
            role: "admin",
            isActive: true,
            _id: { $ne: user._id },
          });

          if (activeAdminCount === 0) {
            return next(
              new ApiError(400, "Cannot deactivate the last active admin user")
            );
          }
        }
        fieldsToUpdate.isActive = isActive;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id, // from params
      fieldsToUpdate,
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change user password
// @route   PUT /api/users/:id/password
// @access  Private/Self
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(
        new ApiError(400, "Current password and new password are required")
      );
    }

    const user = await User.findById(req.params.id).select("+password");

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Only allow users to change their own password (except admins)
    if (req.user.id !== user._id.toString() && req.user.role !== "admin") {
      return next(
        new ApiError(403, "Not authorized to change this user's password")
      );
    }

    // Verify current password (skip for admins)
    if (req.user.id === user._id.toString()) {
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return next(new ApiError(401, "Current password is incorrect"));
      }
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Invalidate all existing tokens by removing refreshToken
    await User.findByIdAndUpdate(user._id, { $unset: { refreshToken: "" } });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Prevent deleting the last admin
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return next(new ApiError(400, "Cannot delete the last admin user"));
      }
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
