import express from "express";
import { getStats } from "../controllers/StatsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const StatsRoutes = express.Router();

StatsRoutes.get("/", verifyToken, getStats);

export default StatsRoutes;
