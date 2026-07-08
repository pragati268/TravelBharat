import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/user-model.js";
import userValidationSchema from "../validators/userValidator.js";

import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  // Validate request body
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }

  const { fullname, email, password } = req.body;

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const err = new Error("User already exists");
    err.statusCode = 409;
    throw err;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  // Send response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      role: user.role,
    });
});

export default { registerUser, loginUser };
