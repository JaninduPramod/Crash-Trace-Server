import express from "express";
import {
  registerUser,
  testing,
  loginUser,
  sendOtp,
  verifyOtp,
  changePassword,
  getUserProfile
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const AuthRoutes = express.Router();

AuthRoutes.get("/test", testing);
AuthRoutes.post("/register", registerUser);
AuthRoutes.post("/login", loginUser);
AuthRoutes.post("/sendOtp", sendOtp);
AuthRoutes.post("/verifyOtp", verifyOtp);
AuthRoutes.post("/newPassword", changePassword);
AuthRoutes.get("/userProfile",verifyToken, getUserProfile);

export default AuthRoutes;
