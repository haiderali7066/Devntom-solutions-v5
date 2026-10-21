import "server-only";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/** Everything uploaded from the admin panel lives in this folder. */
export const BLOG_FOLDER = "devntom/blog";

export type UploadedImage = { url: string; publicId: string; width: number; height: number };

/** Uploads an image buffer. Call only after requireAdmin() and file checks. */
export function uploadImage(buffer: Buffer, folder: string = BLOG_FOLDER): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
        // keep the stored original reasonably sized; delivery formats are optimised by the URL
        transformation: [{ width: 2000, crop: "limit", quality: "auto" }],
      },
      (err, res?: UploadApiResponse) => {
        if (err || !res) return reject(err ?? new Error("Upload failed"));
        resolve({ url: res.secure_url, publicId: res.public_id, width: res.width, height: res.height });
      },
    );
    stream.end(buffer);
  });
}

/** Deletes an image, but only inside the blog folder so a bad id cannot remove other assets. */
export async function deleteImage(publicId: string): Promise<boolean> {
  if (!publicId || !publicId.startsWith(`${BLOG_FOLDER}/`)) return false;
  const res = await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
  return res.result === "ok";
}

/** Adds automatic format and quality, and a width, to a Cloudinary delivery URL. */
export function optimizedUrl(url: string, width = 1200): string {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}
