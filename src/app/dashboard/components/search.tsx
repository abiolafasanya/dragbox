'use client';
import { Input } from '@/components/ui/input';
import useSearch from '../useSearch';
import { Upload } from '@prisma/client';
import Image from 'next/image';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  images: Upload[];
  filter: (tag: string) => void;
  reset: () => void;
}
const SearchBox = ({ images, filter, reset }: Props) => {
  const { loading, handleSearch, result,resetSearch,showResult, searchTerm } = useSearch({ uploads: images });
  const handleFilter = (tag: string) => {
    filter(tag)
    resetSearch()
  }
  return (
    <div className='flex space-x-2 mt-5 mb-10 max-w-xs relative'>
      <Input
        type='search'
        placeholder='search image tag...'
        value={searchTerm}
        onChange={handleSearch}
      />
      <Button onClick={reset}>Reset</Button>
      <div className='absolute right-0 z-50 bottom-0 top-7 mt-5 w-full'>
        {result && loading ? (
          <p className='flex bg-white'>searching...</p>
        ) : (
          <Fragment>
            {showResult && result?.image && (
              <div
                className='flex items-center rounded-md border justify-between p-2 bg-white shadow-md cursor-pointer gap-2'
                onClick={() => handleFilter(result?.tag || '')}
              >
                <Image
                  src={result?.image}
                  alt='image result'
                  width={50}
                  height={50}
                  className=''
                />
                <span className='truncate'>{result.tag}</span>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
