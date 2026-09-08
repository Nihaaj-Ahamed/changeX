import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "zj23dcpu",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extracts the Cloudinary publicId from a given image URL.
 * Handles folders, versions (v12345), and formats.
 */
export const extractPublicId = (url) => {
  if (!url || typeof url !== "string") return null;
  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;
    let path = url.substring(uploadIndex + 8);
    path = path.split("?")[0];
    const segments = path.split("/");
    const cleanSegments = segments.filter(
      (seg) => !/^v\d+$/.test(seg) && !seg.includes(",")
    );
    if (cleanSegments.length === 0) return null;
    const fullPathWithExt = cleanSegments.join("/");
    const lastDotIndex = fullPathWithExt.lastIndexOf(".");
    const publicId =
      lastDotIndex !== -1
        ? fullPathWithExt.substring(0, lastDotIndex)
        : fullPathWithExt;
    return publicId;
  } catch (err) {
    console.error("Failed to parse Cloudinary publicId:", err);
    return null;
  }
};

/**
 * Permanently deletes an image from Cloudinary storage.
 */
export const deleteImageFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return null;
  const publicId = extractPublicId(imageUrl);
  if (!publicId) return null;

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn(
      `[Cloudinary] API credentials not found in .env. Skipping storage deletion for: ${publicId}`
    );
    return null;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`[Cloudinary] Successfully deleted image ${publicId}:`, result);
    return result;
  } catch (err) {
    console.error(`[Cloudinary] Error deleting image ${publicId}:`, err);
    return null;
  }
};

/**
 * Permanently deletes multiple images from Cloudinary storage.
 */
export const deleteMultipleImagesFromCloudinary = async (imageUrls) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) return [];
  return Promise.all(imageUrls.map((url) => deleteImageFromCloudinary(url)));
};

export default cloudinary;
