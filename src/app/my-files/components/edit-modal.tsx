import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { useEditModal } from "@/hooks/useEditModal";
import { setCanvasPreview } from "@/utility/canvas-previes";
import {
  CropIcon,
  FlipHorizontal,
  FlipVertical,
  ImageIcon,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { twMerge } from "tailwind-merge";

export default function EditModal() {
  const { openEditModal, toggleEditModal, selectedItem } = useEditModal();
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [brightness, setBrightness] = useState<number[]>([100]);
  const [contrast, setContrast] = useState<number[]>([100]);
  const [grayscale, setGrayscale] = useState<number[]>([0]);
  const [sepia, setSepia] = useState<number[]>([0]);
  const [saturate, setSaturate] = useState<number[]>([100]);
  const [hue, setHue] = useState<number[]>([0]);
  const [crop, setCrop] = useState<Crop>();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (!selectedItem?.imageUrl) return;
    setImageSrc(selectedItem?.imageUrl);
  }, [selectedItem]);

  function reset() {
    setBrightness([100]);
    setContrast([100]);
    setGrayscale([0]);
    setSepia([0]);
    setSaturate([100]);
    setHue([0]);
    setRotation(0);
  }

  function handleRotateLeft() {
    setRotation((prevRotation) => prevRotation - 90);
  }

  function handleRotateRight() {
    setRotation((prevRotation) => prevRotation + 90);
  }

  function handleFlipHorizontal() {
    setFlipHorizontal((prevFlip) => !prevFlip);
  }

  function handleFlipVertical() {
    setFlipVertical((prevFlip) => !prevFlip);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    console.log(width, height);

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 50,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  function handleCrop() {
    const imgSource = imageRef.current;
    if (!imgSource || !crop) return;
    const canvas = document.createElement("canvas");
    const pixelCrop = convertToPixelCrop(
      crop,
      imageRef.current.width,
      imageRef.current.height
    );
    const { canvasElement, ctx } = setCanvasPreview({
      crop: pixelCrop,
      image: imageRef.current,
      canvas,
    });
    const base64Url = canvasElement.toDataURL("image/jpg");
    setImageSrc(base64Url);
  }

  // Call this function when the 'Save Changes' button is clicked

  function savechange() {
    if (!selectedItem) return;
    // Create a canvas element
    if (!imageRef?.current?.src || !crop) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    // coming soon implementation to save changes
    toast({ description: "Feature is coming soon..." });
  }

  if (!openEditModal) return null;

  const transformStyles = {
    transform: `rotate(${rotation}deg) scaleX(${
      flipHorizontal ? -1 : 1
    }) scaleY(${flipVertical ? -1 : 1})`,
    filter: `brightness(${brightness[0]}%) sepia(${sepia[0]}%) grayscale(${grayscale[0]}%) hue-rotate(${hue[0]}deg) saturate(${saturate[0]}%) contrast(${contrast[0]}%)`,
  };

  return (
    <section
      className={`fixed inset-0 z-50 bg-black/90 transition-all delay-150 duration-1000 overflow-auto overflow-y-hidden`}
    >
      <div className="flex justify-center items-center h-full relative">
        <section className="absolute w-3/4 h-3/4 overflow-hidden bg-white">
          <button
            className="absolute top-2 right-2 bg-black/10 rounded-full p-1"
            onClick={toggleEditModal}
          >
            <X className="text-black" />
          </button>

          <article className="flex justify-between items-start gap-10 p-5 h-full">
            {/* Filter controls */}
            <div className="w-full h-full p-5 space-y-5">
              <h2 className="text-base font-semibold">Filters</h2>
              <article className="border rounded h-auto items-center p-3 grid grid-cols-2 gap-5">
                <Effects title="Grayscale">
                  <Slider
                    value={grayscale}
                    onValueChange={(val) => setGrayscale(val)}
                    max={200}
                    step={1}
                  />
                </Effects>
                <Effects title="Sepia">
                  <Slider
                    value={sepia}
                    onValueChange={(val) => setSepia(val)}
                    max={200}
                    step={1}
                  />
                </Effects>
                <Effects title="Saturated">
                  <Slider
                    value={saturate}
                    onValueChange={(val) => setSaturate(val)}
                    max={200}
                    step={1}
                  />
                </Effects>
                <Effects title="Brightness">
                  <Slider
                    value={brightness}
                    onValueChange={(val) => setBrightness(val)}
                    max={200}
                    step={1}
                  />
                </Effects>
                <Effects title="Contrast">
                  <Slider
                    value={contrast}
                    onValueChange={(val) => setContrast(val)}
                    max={200}
                    step={1}
                  />
                </Effects>
                <Effects title="Hue Rotate">
                  <Slider
                    value={hue}
                    onValueChange={(val) => setHue(val)}
                    max={200}
                    step={1}
                  />
                </Effects>

                <Button
                  variant={"outline"}
                  className="w-full col-span-2"
                  onClick={reset}
                >
                  Reset Filter
                </Button>
              </article>
            </div>

            {/* Image Preview and Render */}
            <div className="w-full h-full p-5">
              <h2 className="text-base font-semibold">Image preview</h2>
              <article className="relative border mt-5 w-full flex flex-col items-center justify-center h-[250px] overflow-clip">
                {!imageSrc && <ImageIcon size={100} />}
                {imageSrc && selectedItem && (
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    className="w-full full"
                  >
                    <Image
                      ref={imageRef}
                      src={imageSrc}
                      alt={selectedItem.description}
                      // onLoad={onImageLoad}
                      width={300}
                      height={300}
                      className={`w-full h-full object-cover object-center`}
                      style={transformStyles}
                      loading="lazy"
                      priority={false}
                    />
                  </ReactCrop>
                )}
              </article>

              <div
                id="controls-preview"
                className="py-2 flex items-center space-x-3"
              >
                <Button variant={"outline"} onClick={handleFlipHorizontal}>
                  <FlipHorizontal />
                </Button>
                <Button variant={"outline"} onClick={handleFlipVertical}>
                  <FlipVertical />
                </Button>
                <Button variant={"outline"} onClick={handleRotateLeft}>
                  <RotateCcw />
                </Button>
                <Button variant={"outline"} onClick={handleRotateRight}>
                  <RotateCw />
                </Button>
                <Button variant={"outline"} onClick={() => handleCrop()}>
                  <CropIcon />
                </Button>
              </div>

              <div className="flex w-full my-5">
                <article className="ml-auto space-x-5">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={toggleEditModal}
                  >
                    Close
                  </Button>
                  <Button type="button" onClick={savechange}>
                    Save Changes
                  </Button>
                </article>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

function Effects({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="mb-2">{title}</Label>
      {children}
    </div>
  );
}
