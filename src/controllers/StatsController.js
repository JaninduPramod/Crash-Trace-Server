import { getStatsService } from "../services/StatsServices.js";

export const getStats = async (req, res, next) => {
  try {
    const response = await getStatsService();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
