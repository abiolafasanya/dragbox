'use client';

import { useToast } from '@/components/ui/use-toast';
import Axios from '@/lib/Axios';
import { Upload } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  uploads: Upload[];
}

const useGallery = () => {
  const [images, setImages] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [currentHover, setCurrentHover] = useState<number | null>(null);
  const { toast } = useToast();
  const [isFilter, setIsFilter] = useState(false);

  async function updateGallery() {
    const { data, status } = await Axios.get('/api/upload');
    if (status === 200) {
      setImages(data.uploads as Upload[]);
    }
    setImages((images) => images);
    setLoading(false);
  }

  function reset() {
    updateGallery()
  }

  async function filterGallery(tag: string) {
    const { data, status } = await Axios.get<{ uploads: Upload[] }>(
      '/api/upload'
    );
    if (status === 200) {
      // console.log(data);
      const filterImage = data.uploads.filter((upload) => upload.tag === tag);
      // console.log(filterImage);
      setImages(() => filterImage);
      setLoading(false);
      return;
    }
    updateGallery();
  }

  async function handleSetImages() {
    await updateGallery();
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
    reset,
    filterGallery,
  };
};

export default useGallery;
