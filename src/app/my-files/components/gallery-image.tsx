"use client";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import GalleryItem from "./gallery-item";

import { Fragment } from "react";
import { ImageDataFile } from "@/types";
import GalleryLoader from "@/app/components/gallery-loader";
import { DocumentData } from "firebase/firestore";
import { useModal } from "@/app/(Home)/hooks/useModal";
import CarouselModal, {
  UserCarouselModal,
} from "@/app/(Home)/component/carousel";
import { Copy, Edit, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { handleShare } from "@/utility/share";
import { handleCopyContent } from "@/utility/copy";
// import CarouselModal from "./carousel";
// import { useModal } from "../hooks/useModal";

interface Props<T> {
  isLoading: boolean;
  isTouchDevice: boolean;
  images: T[];
}

function GalleryImages({
  isLoading,
  isTouchDevice,
  images,
}: Props<DocumentData>) {
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
                      key={image.uid}
                      tag={image.description}
                      path={image.imageUrl}
                      index={index + 1}
                      isDraggable={!isTouchDevice}
                      onSelect={() => handleSelectImage(index)}
                    />
                    <div id="edit">
                      <Edit />
                    </div>
                    <div className="w-full absolute bottom-0 z-50 bg-white shadow-lg flex items-center justify-center space-x-2 p-2">
                      <FacebookShareButton
                        url={image.imageUrl}
                        title={image.name}
                      >
                        <Facebook size={24} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={image.imageUrl}
                        title={image.name}
                      >
                        <Twitter size={24} />
                      </TwitterShareButton>
                      <LinkedinShareButton
                        url={image.imageUrl}
                        title={image.name}
                      >
                        <Linkedin size={24} />
                      </LinkedinShareButton>
                      <button
                        onClick={(e) => handleCopyContent(e, image.imageUrl)}
                        className="copy-button"
                        aria-label="Copy image link"
                      >
                        <Copy size={24} />
                      </button>
                      <button
                        onClick={() =>
                          handleShare({
                            text: image.description,
                            title: image.name,
                            url: image.imageUrl,
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
        <UserCarouselModal images={images} />
      </>
    );
  }
}

export default GalleryImages;
