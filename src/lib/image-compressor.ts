export interface CompressionResult {
  file: File | Blob;
  wasCompressed: boolean;
  originalBytes: number;
  compressedBytes: number;
  reductionPercent: number;
  formattedOriginal: string;
  formattedCompressed: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Auto-compresses an image client-side if file size exceeds threshold (default 800 KB).
 * Uses Canvas API with high quality interpolation and webp/jpeg compression.
 */
export async function autoCompressImage(
  file: File,
  options: {
    thresholdBytes?: number; // default 1.5MB
    maxDimension?: number;   // default 2560px
    quality?: number;        // default 0.92
  } = {}
): Promise<CompressionResult> {
  const threshold = options.thresholdBytes ?? 1500 * 1024; // 1.5 MB
  const maxDim = options.maxDimension ?? 2560;
  const quality = options.quality ?? 0.92;
  const originalBytes = file.size;

  // If already under threshold, skip compression
  if (originalBytes <= threshold) {
    return {
      file,
      wasCompressed: false,
      originalBytes,
      compressedBytes: originalBytes,
      reductionPercent: 0,
      formattedOriginal: formatBytes(originalBytes),
      formattedCompressed: formatBytes(originalBytes),
    };
  }

  // If in browser environment, compress using Canvas
  if (typeof window === "undefined") {
    return {
      file,
      wasCompressed: false,
      originalBytes,
      compressedBytes: originalBytes,
      reductionPercent: 0,
      formattedOriginal: formatBytes(originalBytes),
      formattedCompressed: formatBytes(originalBytes),
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Scale down if larger than maxDimension
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve({
            file,
            wasCompressed: false,
            originalBytes,
            compressedBytes: originalBytes,
            reductionPercent: 0,
            formattedOriginal: formatBytes(originalBytes),
            formattedCompressed: formatBytes(originalBytes),
          });
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        const outputType = "image/webp";
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= originalBytes) {
              // If compression didn't save size, keep original
              return resolve({
                file,
                wasCompressed: false,
                originalBytes,
                compressedBytes: originalBytes,
                reductionPercent: 0,
                formattedOriginal: formatBytes(originalBytes),
                formattedCompressed: formatBytes(originalBytes),
              });
            }

            const compressedBytes = blob.size;
            const reduction = Math.round(((originalBytes - compressedBytes) / originalBytes) * 100);

            // Create a File from Blob with original name (extension .webp)
            const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const compressedFile = new File([blob], newName, { type: outputType });

            resolve({
              file: compressedFile,
              wasCompressed: true,
              originalBytes,
              compressedBytes,
              reductionPercent: reduction,
              formattedOriginal: formatBytes(originalBytes),
              formattedCompressed: formatBytes(compressedBytes),
            });
          },
          outputType,
          quality
        );
      };
      img.onerror = () => {
        resolve({
          file,
          wasCompressed: false,
          originalBytes,
          compressedBytes: originalBytes,
          reductionPercent: 0,
          formattedOriginal: formatBytes(originalBytes),
          formattedCompressed: formatBytes(originalBytes),
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image (File or Blob) to Cloudinary
 */
export async function uploadToCloudinary(file: File | Blob): Promise<{
  url: string;
  error?: string;
  public_id?: string;
}> {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "lko4pztb";
  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "creovatesstudio";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      if (data?.error?.message?.includes("Unknown API key")) {
        throw new Error(
          "Cloudinary preset '" +
            uploadPreset +
            "' is currently set to 'Signed'. Please go to Cloudinary Dashboard > Settings > Upload > Upload Presets and set it to 'Unsigned'."
        );
      }
      throw new Error(data?.error?.message || "Failed to upload image to Cloudinary");
    }

    return {
      url: data.secure_url || data.url,
      public_id: data.public_id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Cloudinary upload error";
    return {
      url: "",
      error: errorMsg,
    };
  }
}
