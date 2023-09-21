import { Upload } from '@prisma/client';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { handleCopyContent } from '@/utility/copy';
import { DragEvent } from 'react';

interface Props {
  media: Upload;
  index: number;
  currentHover: number | null;
  dragItem: any;
  handlSorting: (e: DragEvent<HTMLDivElement>) => void;
  handleDragEnter: (index: number) => void;
  isDraggable: boolean;
}

const ImageCard = ({
  media,
  index,
  currentHover,
  dragItem,
  handlSorting,
  handleDragEnter,
  
}: Props) => {
  return (
    <div
      className={`relative flex ease-in-out transistion delay-300 rounded-lg border-2  h-48 w-full ${
        (currentHover as number) === index ? 'bg-stone-200' : ''
      }`}
      key={index}
      draggable
      onDragStart={(e) => (dragItem.current = index)}
      onDragEnter={(e) => handleDragEnter(index)}
      onDragEnd={(e) => handlSorting(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      <Image
        src={media.image}
        width={300}
        height={300}
        className='w-full h-full object-cover object-center'
        alt='images'
        draggable={false}
      />
      <div className='absolute cursor-pointer flex justify-between gap-2 w-full bg-stone-900 px-2 py-3 right-0 left-0 text-center capitalize rounded-b-md bottom-0 bg-opacity-70 text-white text-sm flex-nowrap line-clamp-1'>
        <span className='text-sm w-[80%] truncate'> {media.tag}</span>
        <button onClick={(e) => handleCopyContent(e, media.tag)}>
          <Copy size={20} className='text-xs' />
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
