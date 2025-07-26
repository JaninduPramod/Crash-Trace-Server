import { createReportService,voteReportService,getApprovedReportsService,searchReportService,getAllReportsService,editReportService,processReportService } from "../services/ReportServices.js";

export const createReport = async (req, res, next) => {
  try {
    const reporterId = req._id
    
    const response = await createReportService(req.body, reporterId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllReports = async (req, res, next) => {
  try {
    const response = await getAllReportsService();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }

}

export const getApprovedReports = async (req, res, next) => {
  try {
    const response = await getApprovedReportsService();
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const searchReport = async (req, res, next) => {
  try {
    const vehicleNo = req.body.vehicleNo;
    const response = await searchReportService(vehicleNo);

    console.log("Location:", response.data.location[0]);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const editReport = async (req, res, next) => {
  try {
    const { cardID, title, description, damageRate, vehicleNo, address } = req.body;
    const response = await editReportService(cardID, { title, description, damageRate, vehicleNo, address });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const processReport = async (req, res, next) => {
  try {
    const { cardID, option } = req.body;
    const response = await processReportService(cardID, option);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const voteReport = async (req, res, next) => {
  try {
    const { reportId, voteType } = req.body;
    const userId = req.user.id; 
    const result = await voteReportService(reportId, voteType, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};