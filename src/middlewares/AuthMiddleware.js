import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { CustomError } from "./ErrorMiddleware.js";

export const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      req._id = decoded.id;
      console.log("Decoded ID:", req._id);
      req.user = decoded;

      if (!req.user) {
        throw new CustomError("User not found", 200);
      }

      next();
    } catch (error) {
      throw new CustomError("Not authorized, token failed", 200);
    }
  } else {
    throw new CustomError("Not authorized, no token", 200);
  }
};
