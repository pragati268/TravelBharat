import cloudinary from "../config/cloudinary.js";

export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

export const deleteMultipleImages = async (publicIds) => {
  if (!publicIds || publicIds.length === 0) return;
  const validIds = publicIds.filter(Boolean);
  if (validIds.length === 0) return;
  try {
    await Promise.all(validIds.map((id) => cloudinary.uploader.destroy(id)));
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }
};
