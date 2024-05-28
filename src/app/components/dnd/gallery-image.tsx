"use client";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import GalleryItem from "./gallery-item";
import GalleryLoader from "../gallery-loader";
import { Fragment } from "react";
import { ImageDataFile } from "@/types";

interface Props<T> {
  isLoading: boolean;
  isTouchDevice: boolean;
  currentHover: number;
  images: T[];
}

function GalleryImages({
  isLoading,
  isTouchDevice,
  currentHover,
  images,
}: Props<ImageDataFile>) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GalleryLoader count={4} />
      </div>
    );
  } else {
    return (
      <SortableContext
        strategy={rectSortingStrategy}
        items={images.map((image, index) => ({ ...image, id: index + 1 }))}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Fragment>
            {images.length > 0 &&
              images.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  tag={image.alt}
                  path={image.src.portrait}
                  index={index + 1}
                  isDraggable={!isTouchDevice}
                  currentHover={currentHover}
                />
              ))}
          </Fragment>
        </div>
      </SortableContext>
    );
  }
}

export default GalleryImages;
