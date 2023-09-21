'use client';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import { handleCopyContent } from '@/utility/copy';
import { Copy } from 'lucide-react';

type ImageItemProps = {
  path: string;
  tag: string;
  index: number;
  isDraggable: boolean;
  currentHover: number | null;
};

const GalleryItem = ({
  path,
  tag,
  index,
  isDraggable,
  currentHover,
}: ImageItemProps) => {
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(
    null
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });
  const isDragged = index === draggedImageIndex;
  const zIndex = isDragged ? 100 : 0;
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex,
    touchAction: isDraggable ? 'none' : 'auto',
  };

  const handleDragStart = () => {
    setDraggedImageIndex(index);
    if (!isDraggable) {
      return false;
    }
  };

  return (
    <article
      className=''
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDragStart={handleDragStart}
    >
      <div
        className={`relative flex ease-in-out transistion delay-300 rounded-lg border-2  h-48 w-full ${
          (currentHover as number) === index ? 'bg-stone-200' : ''
        }`}
      >
        <Image
          src={path}
          width={300}
          height={300}
          className='w-full h-full object-cover object-center'
          alt='images'
          draggable={false}
        />
        <div className='absolute cursor-pointer flex justify-between gap-2 w-full bg-stone-900 px-2 py-3 right-0 left-0 text-center capitalize rounded-b-md bottom-0 bg-opacity-70 text-white text-sm flex-nowrap line-clamp-1'>
          <span className='text-sm w-[80%] truncate'> {tag}</span>
          <button onClick={(e) => handleCopyContent(e, tag)}>
            <Copy size={20} className='text-xs' />
          </button>
        </div>
      </div>
    </article>
  );
};

export default GalleryItem;
