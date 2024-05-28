"use client";
import React from "react";
import Gallery from "./gallery";
import { Input } from "@/components/ui/input";
import { useGallery } from "../hooks/useGallery";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "../hooks/useModal";

export function HomeGallery() {
  return (
    <div className="w-full">
      <Gallery />
    </div>
  );
}

export function SearchInput() {
  const { filterGallery, images, searchList, setImages } = useGallery();
  const { updateModalIndex, toggleModal } = useModal();
  function handleSelection(index: number) {
    const selectedImage = searchList[index];
    // const data = [...images, selectedImage]
    const isImagePresent = images.some((img, i) => img.id === selectedImage.id);
    if (!isImagePresent) {
      const newData = [...images, selectedImage];
      setImages(newData);
      const newImageIndex = newData.findIndex(
        (img) => img.id === selectedImage.id
      );
      updateModalIndex(newImageIndex);
      toggleModal();
    }
  }

  return (
    <section className="w-full md:max-w-3xl mx-auto bg-white rounded-lg py-2 relative">
      <Input
        placeholder="Search Images"
        className="text-base w-full focus-visible:ring-transparent  outline-none border-none bg-transparent border-transparent focus-visible:ring-0"
        onChange={({ target }) => filterGallery(target.value)}
      />
      {searchList.length > 0 && (
        <div className="absolute right-0 z-10 top-[4.7rem] bg-white w-full shadow-md rounded">
          <ScrollArea className="w-full max-h-[200px] flex flex-col space-y-2">
            {searchList.map((search, i) => (
              <div
                onClick={() => handleSelection(i)}
                className="w-full cursor-pointer justify-normal text-base items-start text-balance text-left flex p-3 hover:bg-slate-100"
                key={i}
              >
                {search.alt}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </section>
  );
}
