import express from "express";
import multer from "multer";
import { uploadImage, getImage } from "../controllers/ImageController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const upload = multer();
const ImageRoutes = express.Router();

ImageRoutes.post("/upload", upload.single("image"), verifyToken, uploadImage);
ImageRoutes.post("/getImage", verifyToken, getImage);


export default ImageRoutes;
