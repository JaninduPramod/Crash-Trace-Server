import Image from "../models/Image.js";
import { CustomError } from "../middlewares/ErrorMiddleware.js";
import { ApiResponse } from "../response/ApiResponse.js";

export const uploadImageService = async (file, userId) => {
  try {
    const image = new Image({
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
      user: userId,
    });
    const savedImage = await image.save();
    // Optionally, you can return a structured response
    return new ApiResponse(
      {
        id: savedImage._id,
        filename: savedImage.filename,
        contentType: savedImage.contentType,
        userId: savedImage.user,
      },
      "Image uploaded successfully",
      true
    );
  } catch (error) {
    throw new CustomError("Failed to upload image", 500);
  }
};

export const getImageService = async (id) => {
  try {
    const image = await Image.findById(id);
    if (!image) {
      throw new CustomError("Image not found", 404);
    }
    return image;
  } catch (error) {
    throw new CustomError("Failed to retrieve image", 500);
  }
};
