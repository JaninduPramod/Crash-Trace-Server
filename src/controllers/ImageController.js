import { uploadImageService, getImageService } from "../services/ImageServices.js";
import { ApiResponse } from "../response/ApiResponse.js";

export const uploadImage = async (req, res, next) => {
  try {
    const response = await uploadImageService(req.file, req._id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getImage = async (req, res, next) => {
  try {
    const image = await getImageService(req.body.id);
    res.set("Content-Type", image.contentType);
    res.send(image.data);
  } catch (error) {
    next(error);
  }
};

