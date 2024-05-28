"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useRef, useState } from "react";
import TagsInput from "../components/tag-input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 as uuid } from "uuid";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import { CropIcon, Loader2 } from "lucide-react";
import { UploadBodyType } from "@/types";
import { Label } from "@/components/ui/label";
import { useFireStore } from "@/hooks/useFireStore";
// import { setCanvasPreview } from "@/utility/canvas-previes";

export function UploadComponent({ url = "", reset }: { url: string, reset: () => void }) {
  const imageRef = useRef<HTMLImageElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const { uploading, setUploading, uploads, handleUploadImage } =
    useFireStore({reset});

  const [addTag, setAddTag] = useState<string[]>([]);
  function handleSetTags(val: string[]) {
    setAddTag(val);
  }
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
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

  function handleUpload() {
    const values = {
      tags: addTag,
      name,
      url,
      collectionName: "uploads",
      description,
    };
    handleUploadImage({ ...values });
  }

  const [crop, setCrop] = useState<Crop>();
  const [enableCrop, setEnableCrop] = useState(false);

  return (
    <section className="max-w-2xl w-full relative my-12">
      <div className="flex gap-4  h-full justify-center items-center flex-wrap">
        {enableCrop && (
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <div className="flex flex-col gap-2">
              <Image
                ref={imageRef}
                src={url}
                height={300}
                width={300}
                alt=""
                className="object-center object-cover w-full"
                priority={false} // Set to true if you want to prioritize this image
                loading="lazy" // This enables lazy loading
              />
              <div className="flex">
                <Button onClick={() => setEnableCrop(false)}>Cancel</Button>
              </div>
            </div>
          </ReactCrop>
        )}
        {!enableCrop && (
          <div className="flex flex-col gap-2">
            <Image
              src={url}
              height={300}
              width={300}
              alt=""
              onLoad={(e) => onImageLoad(e)}
              className="object-center object-cover w-full"
              priority={false} // Set to true if you want to prioritize this image
              loading="lazy" // This enables lazy loading
            />

            <div className="flex">
              <Button onClick={() => setEnableCrop(true)}>
                Crop <CropIcon />
              </Button>
            </div>
          </div>
        )}

        <article className="w-full flex flex-col gap-2">
          <div>
            <Label>Name (Optional)</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Description (Optional)</Label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div>
            <Label>Tag (Optional)</Label>
            <TagsInput setValue={handleSetTags} />
          </div>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="space-x-2"
          >
            {uploading && <Loader2 className="animate-spin" />}
            <span>{uploading ? "Uploading" : "Upload"}</span>
          </Button>
        </article>
      </div>
    </section>
  );
}
