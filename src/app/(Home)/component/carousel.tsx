// import { ArrowLeft, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState } from "react";

// export default function Carousel() {
//     const [slideImages, setSlideImages] = useState(staticImages);
//     return (
//         <section className="w-full h-screen overflow-hidden">
//       <div className="list">
//         {slideImages.map((img, i) => (
//             <article key={i} className="absolute inset-0">
//             <Image
//               width={500}
//               height={500}
//               loading="eager"
//               alt=""
//               src={img.image}
//               className="w-full h-full object-fit object-cover"
//               />
//             <div className="absolute top-[30%] w-[80%]  translate-x-[-50%] pr-[10%] box-border">
//               <h2 className="text-2xl font-semibold text-white">{img.name}</h2>
//               <p className="text-lg text-whtie">
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
//                 illo quod asperiores saepe odio!
//               </p>
//             </div>
// <div className="absolute bottom-20 left-[50%] max-w-max z-100 flex gap-5 overflow-hidden">
//   {slideImages.map((img, i) => (
//       <article
//       key={i}
//       className="w-[150px] h-[220px] flex-shrink-0 rounded-2xl"
//       >
//       <Image
//         src={img.image}
//         alt=""
//         width={150}
//         height={220}
//         className="w-full h-full object-cover object-fit"
//         />
//       <div className="absolute bottom-2.5 left-2.5 right-2.5"></div>
//     </article>
//   ))}
// </div>

//             {/* Arrow */}
//             <div className="absolute bottom-40 left-10 flex gap-10 ">
//               <button className="bg-slate-900/50 px-5 py-5 rounded-full">
//                 <ArrowLeft className="text-slate-300" />
//               </button>
//               <button className="bg-slate-900/50 px-5 py-5 rounded-full">
//                 <ArrowRight className="text-slate-300" />
//               </button>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X as CloseIcon } from "lucide-react";
import { useGallery } from "../hooks/useGallery";
import { useModal } from "../hooks/useModal";
import { DocumentData } from "firebase/firestore";

export default function CarouselModal() {
  const { images } = useGallery();
  const { modalIndex, isOpen, toggleModal, updateModalIndex } = useModal();

  const handleNextImage = () => {
    if (images.length) {
      updateModalIndex((modalIndex + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    updateModalIndex(modalIndex === 0 ? images.length - 1 : modalIndex - 1);
  };

  useEffect(() => {
    if (!updateModalIndex) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowRight":
          updateModalIndex((modalIndex + 1) % images.length);
          break;
        case "ArrowLeft":
          updateModalIndex(
            modalIndex === 0 ? images.length - 1 : modalIndex - 1
          );
          break;
        case "Escape":
          toggleModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalIndex, isOpen, images.length, toggleModal, updateModalIndex]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
      <div className="flex justify-center items-center h-full">
        <section className="w-full h-screen overflow-hidden relative bg-white">
          {/* Close Button */}
          <button
            onClick={toggleModal}
            className="bg-slate-500/50 px-5 py-5 rounded-full absolute top-5 right-5 z-50"
          >
            <CloseIcon className="text-white" size={24} />
          </button>

          {/* Carousel Content */}
          <div className="list">
            {images.map((img, i) => (
              <article
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === modalIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {
                  <Image
                    width={500}
                    height={500}
                    loading="eager"
                    alt={img.alt}
                    src={img.src.landscape}
                    className="w-full h-full object-fit object-cover"
                  />
                }
                {/* Thumbnail section */}
                <div className="absolute bottom-20 left-[50%] max-w-max z-100 flex gap-5 overflow-hidden">
                  {images.map((img, i) => (
                    <article
                      key={i}
                      className={`w-[150px] h-[220px]  flex-shrink-0 ${
                        i === modalIndex ? "hidden" : ""
                      }`}
                      onClick={() => updateModalIndex(i)}
                    >
                      <Image
                        src={img.src.small}
                        alt={img.alt}
                        width={150}
                        height={220}
                        className="w-full h-full object-cover object-fit rounded-2xl"
                      />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5"></div>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-40 left-10 flex gap-10">
            <button
              onClick={handlePrevImage}
              className="bg-slate-900/50 px-5 py-5 rounded-full"
            >
              <ArrowLeft className="text-slate-300" />
            </button>
            <button
              onClick={handleNextImage}
              className="bg-slate-900/50 px-5 py-5 rounded-full"
            >
              <ArrowRight className="text-slate-300" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function UserCarouselModal({
  images = null,
}: {
  images?: DocumentData[] | null;
}) {
  const { modalIndex, isOpen, toggleModal, updateModalIndex } = useModal();

  const handleNextImage = () => {
    if (!images) return;
    updateModalIndex((modalIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (!images) return;
    updateModalIndex(modalIndex === 0 ? images.length - 1 : modalIndex - 1);
  };

  useEffect(() => {
    if (!updateModalIndex) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (images?.length === 0 || !images) return;

      switch (event.key) {
        case "ArrowRight":
          updateModalIndex((modalIndex + 1) % images.length);
          break;
        case "ArrowLeft":
          updateModalIndex(
            modalIndex === 0 ? images.length - 1 : modalIndex - 1
          );
          break;
        case "Escape":
          toggleModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalIndex, isOpen, images?.length, toggleModal, updateModalIndex]);

  if (!isOpen) return null;
  if (!images || images.length === 0) return;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40">
      <div className="flex justify-center items-center h-full">
        <section className="w-full h-screen overflow-hidden relative bg-white">
          {/* Close Button */}
          <button
            onClick={toggleModal}
            className="bg-slate-500/50 px-5 py-5 rounded-full absolute top-5 right-5 z-50"
          >
            <CloseIcon className="text-white" size={24} />
          </button>

          {/* Carousel Content */}

          {images && (
            <div className="list">
              {images.map((img, i) => (
                <article
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === modalIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {
                    <Image
                      width={500}
                      height={500}
                      loading="eager"
                      alt={img.name}
                      src={img.imageUrl}
                      className="w-full h-full object-fit object-cover"
                    />
                  }
                  {/* Thumbnail section */}
                  <div className="absolute bottom-20 left-[50%] max-w-max z-100 flex gap-5 overflow-hidden">
                    {images.map((img, i) => (
                      <article
                        key={i}
                        className={`w-[150px] h-[220px]  flex-shrink-0 ${
                          i === modalIndex ? "hidden" : ""
                        }`}
                        onClick={() => updateModalIndex(i)}
                      >
                        <Image
                          src={img.imageUrl}
                          alt={img.description}
                          width={150}
                          height={220}
                          className="w-full h-full object-cover object-fit rounded-2xl"
                        />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5"></div>
                      </article>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="absolute bottom-40 left-10 flex gap-10">
            <button
              onClick={handlePrevImage}
              className="bg-slate-900/50 px-5 py-5 rounded-full"
            >
              <ArrowLeft className="text-slate-300" />
            </button>
            <button
              onClick={handleNextImage}
              className="bg-slate-900/50 px-5 py-5 rounded-full"
            >
              <ArrowRight className="text-slate-300" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
