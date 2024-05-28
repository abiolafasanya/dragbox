"use client";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpIcon } from "lucide-react";
import React, { useState, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";

import { UploadComponent } from "./UploadComponent";

export default function UploadPage() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const handleOpenUpload = () => uploadRef.current?.click();

  const [upload, setUpload] = useState<string | null>(null);

  function reset() {
    setUpload(null);
  }

  function handleSelectFile(file: FileList | File[] | null) {
    if (!file) return;
    const render = new FileReader();
    render.addEventListener("load", () => {
      const imageUrl = render.result?.toString() ?? null;
      setUpload(imageUrl);
    });
    render.readAsDataURL(file[0]);
  }

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    //function to handle image file rendering
    handleSelectFile(files);
  };

  return (
    <main className="bg-white w-full">
      <Header />

      {!upload && (
        <section className="max-w-6xl h-full md:mt-24 mx-auto flex flex-col gap-5 items-center justify-center">
          <h2 className="text-2xl font-semibold text-center text-balance px-24">
            Capture life’s moments with your photos and videos, and share them
            to spread joy across the world
          </h2>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-2/4 h-[300px] flex flex-col gap-3 items-center justify-center mx-auto border border-dashed p-5"
          >
            <FileUpIcon className="cursor-pointer" size={48} />
            <h2 className="text-2xl text-balance text-center">
              Drag and Drop or Select File{" "}
            </h2>
            <Button
              type="button"
              className="h-12 px-12"
              onClick={handleOpenUpload}
            >
              Browse
            </Button>
            <Input
              ref={uploadRef}
              onChange={(e) => handleSelectFile(e.target.files)}
              type="file"
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        </section>
      )}

      {upload && (
        <section className="relative max-w-6xl mx-auto flex flex-col gap-5 items-center justify-center">
          <UploadComponent url={upload} reset={reset} />
        </section>
      )}
    </main>
  );
}
