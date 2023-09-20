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
  const { loading, handleSearch, result } = useSearch({ uploads: images });
  return (
    <div className='flex space-x-2 mt-5 mb-10 max-w-xs relative'>
      <Input
        type='search'
        placeholder='search image tag...'
        onChange={handleSearch}
      />
      <Button onClick={reset}>Clear</Button>
      <div className='absolute right-0 z-50 bottom-0 top-7 mt-5 w-full'>
        {result && loading ? (
          <p className='flex bg-white'>searching...</p>
        ) : (
          <Fragment>
            {result?.image && (
              <div
                className='flex items-center rounded-md border justify-between p-2 bg-white shadow-md cursor-pointer'
                onClick={() => filter(result?.tag || '')}
              >
                <Image
                  src={result?.image}
                  alt='image result'
                  width={50}
                  height={50}
                  className=''
                />
                <span>{result.tag}</span>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
