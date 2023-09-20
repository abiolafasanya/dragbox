'use client';

import { useToast } from '@/components/ui/use-toast';
import { Upload } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  uploads: Upload[];
}

const useGallery = ({ uploads }: Props) => {
  const [images, setImages] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [currentHover, setCurrentHover] = useState<number | null>(null);
  const { toast } = useToast();

  async function handleSetImages() {
    await setImages(uploads);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    handleSetImages();
  }, []);

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
    setCurrentHover(index);
  };

  const handlSorting = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const _images = [...images];
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];
    _images.splice(dragOverItem.current, 0, draggedItemContent);

    toast({
      title: 'Image Position Changed',
      description: 'You have successfully sorted an and updated the gallery',
    });
    dragItem.current = null;
    dragOverItem.current = null;
    setCurrentHover(null);
    setImages(_images);
  };

  return {
    images,
    dragItem,
    dragOverItem,
    currentHover,
    handlSorting,
    handleDragEnter,
    loading,
  };
};

export default useGallery;
