"use client";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { handleCopyContent } from "@/utility/copy";
import { Copy } from "lucide-react";
import Thumbnail from "./thumbnail";

type ImageItemProps = {
  path: string;
  tag: string;
  index: number;
  isDraggable: boolean;
  onSelect: () => void;
};

const GalleryItem = ({
  path,
  index,
  isDraggable,
  onSelect,
}: ImageItemProps) => {
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(
    null
  );
  const [currentHover, setCurrentHover] = useState(0);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });
  const isDragged = index === draggedImageIndex;
  const zIndex = isDragged ? 100 : 0;
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex,
    touchAction: isDraggable ? "none" : "auto",
  };

  const handleDragStart = () => {
    setDraggedImageIndex(index);
    if (!isDraggable) {
      return false;
    }
  };

  return (
    <article
      className={`w-full`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDragStart={handleDragStart}
      onClick={onSelect}
      onMouseEnter={() => setCurrentHover(index)}
      onMouseLeave={() => setCurrentHover(null as any)}
    >
      <div className="group relative flex ease-in-out transition delay-300 rounded-lg border-2 w-full">
        <Image
          src={path}
          width={400}
          height={400}
          className="w-full h-[400px] object-cover object-center"
          alt="images"
          draggable={false}
        />
        <div
          className={`absolute inset-0 ${
            currentHover === index ? "opacity-50 bg-black" : "opacity-100"
          } transition-all duration-300`}
        ></div>
        <Thumbnail
          src={path}
          alt={"images"}
          className={`absolute bottom-0 right-0  transition-all duration-500 ease-in-out ${
            currentHover === index
              ? "opacity-100 "
              : "opacity-0 translate-y-full translate-x-20"
          }`}
        />
      </div>
    </article>
  );
};

export default GalleryItem;
