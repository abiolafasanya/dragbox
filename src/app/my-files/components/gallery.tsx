"use client";

import {
  DndContext,
  closestCenter,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import GalleryImages from "./gallery-image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DocumentData } from "firebase/firestore";
// import {useGallery} from "../hooks/useGallery";

function Gallery<T extends DocumentData[]>({ images: data }: { images: T }) {
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
  const [images, setImages] = useState<DocumentData[]>(data);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 50, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useMemo(() => {
    setImages(data);
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        () => "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    }
    // console.log(images);
  }, []);

  const handleDragEnd = ({ active, over }: any) => {
    if (
      !active.data.current ||
      !active.data.current.sortable ||
      !over ||
      !over.data.current ||
      !over.data.current.sortable
    ) {
      return;
    }

    const imagesCopy = [...images];
    const [draggedImage] = imagesCopy.splice(
      active.data.current.sortable.index,
      1
    );

    imagesCopy.splice(over.data.current.sortable.index, 0, draggedImage);
    setImages(imagesCopy);
  };

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [currentHover, setCurrentHover] = useState<number | null>(null);

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
    setCurrentHover(index);
  };

  const handlSorting = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const _images = [...images];
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];
    _images.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setCurrentHover(null);
    setImages(_images);
  };

  return (
    <section className="">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        
      >
        <div className="w-full">
          <GalleryImages
            isLoading={false}
            images={images}
            isTouchDevice={isTouchDevice}
          />
        </div>
      </DndContext>
    </section>
  );
}

export default Gallery;
