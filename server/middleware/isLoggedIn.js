import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import userModel from "../models/user-model.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findOne({ _id: decoded.id });
    req.user = user;

    next();
  
});