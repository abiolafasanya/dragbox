'use client';

import { Upload } from '@prisma/client';
import { useState } from 'react';

interface Props {
  uploads: Upload[];
}

const useSearch = ({ uploads }: Props) => {
  const images = uploads;
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Upload | null>(null);
  const [searchTerm, setSearchTerm] = useState('')

  const resetSearch = () => {
    setShowResult(false);
    setResult(null);
    setSearchTerm('')
  };

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setShowResult(false);
    setResult(null);
    setLoading(true);
    const query = e.target.value;
    setSearchTerm(query)

    images.filter((image) => {
      if (image.tag === query) {
        setResult(image);
        setLoading(false);
        setShowResult(true);
      }
    });
    // e.target.value = ""
  }

  return {
    result,
    handleSearch,
    loading,
    showResult,
    resetSearch,
    searchTerm
  };
};

export default useSearch;
