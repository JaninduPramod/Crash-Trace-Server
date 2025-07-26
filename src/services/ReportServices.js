import Report from "../models/Report.js";
import { CustomError } from "../middlewares/ErrorMiddleware.js";
import { ApiResponse } from "../response/ApiResponse.js";

export const createReportService = async (data, reporterId) => {


  try {
    const report = new Report({
      vehicleNo: data.vehicleNo,
      description: data.description,
      location: data.location.split(","),
      address: data.address,
      reporterId: reporterId,
      date: data.date,
    });
    await report.save();
    return new ApiResponse(null, "Report created successfully", true);
  } catch (error) {
    throw new CustomError("Failed to create report", 200);
  }
};

// function to get all reports
export const getAllReportsService = async () => {
  try {
    const reports = await Report.find().populate("reporterId", "-_id name");
    if (!reports || reports.length === 0) {
      throw new CustomError("No reports found", 200);
    }
    return new ApiResponse(reports, "Reports retrieved successfully", true);
  } catch (error) {
    throw new CustomError("Failed to retrieve reports", 200);
  }
};


// function to get all approved reports
export const getApprovedReportsService = async () => {
    try {
        const reports = await Report.find({ status: "ok" });
        if (!reports || reports.length === 0) {
        throw new CustomError("No reports found", 200);
        }
        return new ApiResponse(reports, "Approved reports retrieved successfully", true);
    } catch (error) {
        throw new CustomError("Failed to retrieve approved reports", 200);
    }
}

// function to search reports by vehicle number
export const searchReportService = async (vehicleNo) => {

  try {
    const report = await Report.findOne({ vehicleNo: vehicleNo }).populate("reporterId", "-_id name");
    if (!report) {
      throw new CustomError("No reports found for this vehicle number", 200);
    }
    return new ApiResponse(report, "Reports retrieved successfully", true);
  } catch (error) {
    throw new CustomError("Failed to retrieve reports", 200);
  }

}

// service function to update a report by cardID
export const editReportService = async (cardID, updateData) => {
  try {
    const report = await Report.findOneAndUpdate({ cardID }, updateData, { new: true });
    if (!report) {
      throw new CustomError("Report not found", 200);
    }
    return new ApiResponse(report, "Report updated successfully", true);
  } catch (error) {
    throw new CustomError("Failed to update report", 200);
  }
};

export const processReportService = async (cardID, option) => {
  try {
    let report;

    if (option === "delete") {
      report = await Report.findOneAndDelete({ cardID });
      if (!report) {
        throw new CustomError("Report not found", 200);
      }
      return new ApiResponse(null, "Report deleted successfully", true);
    }

    if (option === "publish") {
      report = await Report.findOneAndUpdate({ cardID }, { status: "ok" }, { new: true });
      if (!report) {
        throw new CustomError("Report not found", 200);
      }
      return new ApiResponse(report, "Report published successfully", true);
    }

    if (option === "reject") {
      report = await Report.findOneAndUpdate({ cardID }, { status: "bad" }, { new: true });
      if (!report) {
        throw new CustomError("Report not found", 200);
      }
      return new ApiResponse(report, "Report rejected successfully", true);
    }

    throw new CustomError("Invalid option provided", 200);
  } catch (error) {
    throw new CustomError(error.message || "Failed to process report", 200);
  }
};

export const voteReportService = async (cardID, voteType, userId) => {

  const report = await Report.findOne({ cardID });
  if (!report) throw new CustomError("Report not found", 200);

  // Check if user already voted
  const existingVote = report.votes.find(v => v.userId.toString() === userId);
  if (existingVote) throw new CustomError("User already voted", 200);

  // Add vote
  report.votes.push({ userId, type: voteType });

  // Calculate trust rate as a fraction (0-1)
  const upVotes = report.votes.filter(v => v.type === "up").length;
  const totalVotes = report.votes.length;
  report.trustRate = totalVotes > 0 ? upVotes / totalVotes : 0;

  await report.save();
  return { trustRate: report.trustRate, totalVotes, upVotes, votes: report.votes };
};