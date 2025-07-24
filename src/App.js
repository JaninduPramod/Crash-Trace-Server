import express from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorMiddleware.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ImageRoutes from "./routes/ImageRoutes.js";
import ReportRoutes from "./routes/ReportRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/images", ImageRoutes);
app.use("/api/reports", ReportRoutes);


app.use(errorHandler);
export default app;
