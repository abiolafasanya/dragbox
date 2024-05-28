"use client";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import GalleryItem from "./gallery-item";

import { Fragment } from "react";
import { ImageDataFile } from "@/types";
import GalleryLoader from "@/app/components/gallery-loader";
import CarouselModal from "./carousel";
import { useModal } from "../hooks/useModal";
import { Facebook, Twitter, Linkedin, Copy, Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { handleCopyContent } from "@/utility/copy";
import { handleShare } from "@/utility/share";

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
                  <article key={index} className="relative flex flex-col gap-2">
                    <GalleryItem
                      key={image.id}
                      tag={image.alt}
                      path={image.src.portrait}
                      index={index + 1}
                      isDraggable={!isTouchDevice}
                      onSelect={() => handleSelectImage(index)}
                    />
                    <div className="w-full absolute bottom-0 z-50 bg-white shadow-lg flex items-center justify-center space-x-2 p-2">
                      <FacebookShareButton url={image.url} title={image.alt}>
                        <Facebook size={24} />
                      </FacebookShareButton>
                      <TwitterShareButton url={image.url} title={image.alt}>
                        <Twitter size={24} />
                      </TwitterShareButton>
                      <LinkedinShareButton url={image.url} title={image.alt}>
                        <Linkedin size={24} />
                      </LinkedinShareButton>
                      <button
                        onClick={(e) => handleCopyContent(e, image.url)}
                        className="copy-button"
                        aria-label="Copy image link"
                      >
                        <Copy size={24} />
                      </button>
                      <button
                        onClick={() =>
                          handleShare({
                            text: image.photographer_url,
                            title: image.alt,
                            url: image.url,
                          })
                        }
                      >
                        <Share2 />
                      </button>
                    </div>
                  </article>
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
