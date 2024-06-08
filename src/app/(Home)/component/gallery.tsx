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
import React, { useEffect, useState } from "react";
import {useGallery} from "../hooks/useGallery";

const Gallery = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
  const { handleDragEnd, images, filterGallery, currentHover, reset, loading } =
    useGallery();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 50, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        () => "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    }
  }, []);

  return (
    <section className="">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full">
          <GalleryImages
            isLoading={loading}
            images={images}
            isTouchDevice={isTouchDevice}
          />
        </div>
      </DndContext>
    </section>
  );
};

export default Gallery;
