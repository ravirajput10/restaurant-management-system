import { Request, Response, NextFunction } from 'express';
import Staff from '../models/staff.model';
import User from '../models/user.model';
import { ApiError } from '../middleware/error';
import mongoose from 'mongoose';

// @desc    Get all staff
// @route   GET /api/staff
// @access  Private
export const getAllStaff = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await Staff.find().sort({ name: 1 });
    res.json(staff);
  } catch (error) {
    next(error);
  }
};

// @desc    Get staff by ID
// @route   GET /api/staff/:id
// @access  Private
export const getStaffById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return next(new ApiError(404, 'Staff not found'));
    }

    res.json(staff);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new staff member
// @route   POST /api/staff
// @access  Private
export const createStaff = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      role,
      email,
      phone,
      department,
      position,
      joinDate,
      createUser,
      password,
    } = req.body;

    let userId;

    // If createUser is true, create a user account for the staff member
    if (createUser) {
      if (!password) {
        return next(new ApiError(400, 'Password is required when creating a user account'));
      }

      const userRole = role.toLowerCase() === 'manager' ? 'manager' : 'staff';
      
      const user = await User.create(
        [
          {
            name,
            email,
            password,
            role: userRole,
          },
        ],
        { session }
      );

      userId = user[0]._id;
    }

    // Create staff member
    const staff = await Staff.create(
      [
        {
          name,
          role,
          email,
          phone,
          status: 'ACTIVE',
          joinDate,
          department,
          position,
          userId: userId || undefined,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(staff[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Update staff status
// @route   PUT /api/staff/:id/status
// @access  Private
export const updateStaffStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;

    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return next(new ApiError(404, 'Staff not found'));
    }

    staff.status = status;
    const updatedStaff = await staff.save();

    // If staff has a user account, update user status
    if (staff.userId) {
      await User.findByIdAndUpdate(staff.userId, {
        isActive: status === 'ACTIVE',
      });
    }

    res.json(updatedStaff);
  } catch (error) {
    next(error);
  }
};

// @desc    Update staff
// @route   PUT /api/staff/:id
// @access  Private
export const updateStaff = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      role,
      email,
      phone,
      status,
      department,
      position,
      joinDate,
    } = req.body;

    const staff = await Staff.findById(req.params.id).session(session);

    if (!staff) {
      await session.abortTransaction();
      session.endSession();
      return next(new ApiError(404, 'Staff not found'));
    }

    // Update staff fields
    if (name) staff.name = name;
    if (role) staff.role = role;
    if (email) staff.email = email;
    if (phone) staff.phone = phone;
    if (status) staff.status = status;
    if (department) staff.department = department;
    if (position) staff.position = position;
    if (joinDate) staff.joinDate = new Date(joinDate);

    const updatedStaff = await staff.save({ session });

    // If staff has a user account, update user information
    if (staff.userId) {
      const updateData: any = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (status) updateData.isActive = status === 'ACTIVE';
      
      await User.findByIdAndUpdate(staff.userId, updateData, { session });
    }

    await session.commitTransaction();
    session.endSession();

    res.json(updatedStaff);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Delete staff
// @route   DELETE /api/staff/:id
// @access  Private
export const deleteStaff = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const staff = await Staff.findById(req.params.id).session(session);

    if (!staff) {
      await session.abortTransaction();
      session.endSession();
      return next(new ApiError(404, 'Staff not found'));
    }

    // If staff has a user account, delete it
    if (staff.userId) {
      await User.findByIdAndDelete(staff.userId).session(session);
    }

    await staff.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Staff removed' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
