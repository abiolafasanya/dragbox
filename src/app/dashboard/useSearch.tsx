'use client';

import { Upload } from '@prisma/client';
import { useState } from 'react';
import useGallery from './useGallery';

interface Props {
  uploads: Upload[];
}

const useSearch = ({ uploads }: Props) => {
  const images = uploads;
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(true);
  const [result, setResult] = useState<Upload | null>(null);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setTyping(true)
    setResult(null);
    setLoading(true);
    const query = e.target.value;

    images.filter((image) => {  
      if (image.tag === query) {
        setResult(image);
        setLoading(false);
        setTyping(false)
      } 
    });
  }

  return {
    result,
    handleSearch,
    loading,
    typing,
  };
};

export default useSearch;
