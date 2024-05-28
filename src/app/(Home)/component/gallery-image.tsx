"use client";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import GalleryItem from "./gallery-item";

import { Fragment } from "react";
import { ImageDataFile } from "@/types";
import GalleryLoader from "@/app/components/gallery-loader";
import CarouselModal from "./carousel";
import { useModal } from "../hooks/useModal";

interface Props<T> {
  isLoading: boolean;
  isTouchDevice: boolean;
  images: T[];
}

function GalleryImages({
  isLoading,
  isTouchDevice,
  images,
}: Props<ImageDataFile>) {
  const { toggleModal, updateModalIndex } = useModal();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GalleryLoader count={4} />
      </div>
    );
  } else {
    function handleSelectImage(index: number) {
      if (updateModalIndex) {
        updateModalIndex(index);

        toggleModal();
      }
    }

    return (
      <>
        <SortableContext
          strategy={rectSortingStrategy}
          items={images.map((image, index) => ({ ...image, id: index + 1 }))}
        >
          <div className="relative group w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <Fragment>
              {images.length > 0 &&
                images.map((image, index) => (
                  <Fragment key={index}>
                    <GalleryItem
                      key={image.id}
                      tag={image.alt}
                      path={image.src.portrait}
                      index={index + 1}
                      isDraggable={!isTouchDevice}
                      onSelect={() => handleSelectImage(index)}
                    />
                  </Fragment>
                ))}
            </Fragment>
          </div>
        </SortableContext>
        <CarouselModal />
      </>
    );
  }
}

export default GalleryImages;
