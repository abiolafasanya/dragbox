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
import { useAuth } from "@/hooks/auth";
import { useEditModal } from "@/hooks/useEditModal";
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
  const { user } = useAuth();
  const { toggleEditModal, handleSelectItem } = useEditModal();
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
          <div className="relative group w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <Fragment>
              {images.length > 0 &&
                images.map((image, index) => (
                  <article key={index} className="relative flex flex-col gap-2">
                    {user?.uid === image.uid && (
                      <div className="w-full absolute -top-2 z-50 right-0 flex py-2">
                        <button
                          className="ml-auto m-2 bg-black opacity-50 p-2 rounded-full"
                          onClick={() => {
                            handleSelectItem(image);
                            toggleEditModal();
                          }}
                        >
                          <Edit size={16} className="text-slate-300" />
                        </button>
                      </div>
                    )}
                    <GalleryItem
                      key={image.uid}
                      tag={image.description}
                      path={image.imageUrl}
                      index={index + 1}
                      isDraggable={!isTouchDevice}
                      onSelect={() => handleSelectImage(index)}
                    />

                    <div className="w-full absolute bottom-0 z-10 bg-white/50 shadow-lg flex items-center justify-evenly space-x-2 p-2">
                      <FacebookShareButton
                        url={image.imageUrl}
                        title={image.name}
                      >
                        <Facebook size={16} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={image.imageUrl}
                        title={image.name}
                      >
                        <Twitter size={16} />
                      </TwitterShareButton>
                      <LinkedinShareButton
                        url={image.imageUrl}
                        title={image.name}
                      >
                        <Linkedin size={16} />
                      </LinkedinShareButton>
                      <button
                        onClick={(e) => handleCopyContent(e, image.imageUrl)}
                        className="copy-button"
                        aria-label="Copy image link"
                      >
                        <Copy size={16} />
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
                        <Share2 size={16} />
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
