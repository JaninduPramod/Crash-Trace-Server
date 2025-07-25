import express from "express";
import { createReport,getApprovedReports,voteReport,searchReport,getAllReports, editReport, processReport } from "../controllers/ReportController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const ReportRoutes = express.Router();

ReportRoutes.post("/create", verifyToken, createReport);
ReportRoutes.get("/approvedReports", verifyToken, getApprovedReports);
ReportRoutes.post("/searchReport", verifyToken, searchReport);
ReportRoutes.get("/allReports", verifyToken, getAllReports);
ReportRoutes.put("/editReport", verifyToken, editReport);
ReportRoutes.post("/processReport", verifyToken, processReport);
ReportRoutes.post("/vote", verifyToken, voteReport);

export default ReportRoutes;
