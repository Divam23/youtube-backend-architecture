import cloudinary from "../config/cloudinary.config";
import { Response } from "express";
import fs from "fs";
import { ApiError } from "./ApiError";
import { ApiResponse } from "./ApiResponse";

const uploadOnCloudinary = async (
  localFilePath: string,
  folder: string,
  resourceType: "image" | "video" = "image",
) => {
  try {
    if (!localFilePath) throw new ApiError(400, "File path missing");
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: resourceType,
      quality_analysis: true,
      allowed_formats: ["jpg", "png", "webp", "mp4", "webm", "mov" , "mkv"],
    });
    console.log("File has been uploaded successfully", result.url)
    return result;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while uploading media...");
  } finally {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
