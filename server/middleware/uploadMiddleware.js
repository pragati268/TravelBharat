import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const upload = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `travelbharat/${folderName}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
  });

  return multer({ storage });
};

export default upload;