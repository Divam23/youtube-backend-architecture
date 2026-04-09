import { uploadOnCloudinary } from "../utils/cloudinary";

const uploadMedia = async (
  filePath: string,
  userId: string,
  type: "avatar" | "thumbnail" | "video",
) => {
  let folder = "";

  switch (type) {
    case "avatar":
      folder = `users/${userId}/avatar`;
      break;

    case "video":
        folder = `users/${userId}/video`;
        break;

    case "thumbnail":
        folder = `users/${userId}/thumbnail`;
        break;

  }
  const resourceType = type === "video" ? "video" : "image"

  return await uploadOnCloudinary(filePath, folder, resourceType)
};

export {uploadMedia}