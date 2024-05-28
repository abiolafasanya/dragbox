import { PixelCrop } from "react-image-crop";

export const setCanvasPreview = ({
  image,
  canvas,
  crop,
}: {
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
  crop: PixelCrop;
}) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Set the canvas size to the scaled crop size
  canvas.width = crop.width * scaleX * pixelRatio;
  canvas.height = crop.height * scaleY * pixelRatio;

  ctx.imageSmoothingQuality = "high";

  // Calculate the position to draw the image from
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    image,
    cropX,
    cropY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );
};
