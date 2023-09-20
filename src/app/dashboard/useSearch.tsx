'use client';

import { Upload } from '@prisma/client';
import { useState } from 'react';

interface Props {
  uploads: Upload[];
}

const useSearch = ({ uploads }: Props) => {
  const images = uploads;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Upload | null>(null);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setResult(null)
    setLoading(true);
    const query = e.target.value;

    images.filter((image) => {
      if (image.tag === query) {
        setResult(image);
      }
      setLoading(false);
    });
  }

  return {
    result,
    handleSearch,
    loading,
  };
};

export default useSearch;
