import User from "../models/User.js";
import Report from "../models/Report.js";
import { ApiResponse } from "../response/ApiResponse.js";

export const getStatsService = async () => {
  const [totalReports, totalUsers, approvedReports] = await Promise.all([
    Report.countDocuments(),
    User.countDocuments(),
    Report.countDocuments({ status: "ok" })
  ]);

  const approvedPercentage = totalReports > 0 ? Math.round((approvedReports / totalReports) * 100) : 0;

  return new ApiResponse({
    totalReports,
    totalUsers,
    approvedPercentage
  }, "Statistics fetched successfully", true);
};
