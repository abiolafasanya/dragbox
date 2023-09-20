'use client';
import { Upload } from '@prisma/client';
import { Fragment } from 'react';
import GalleryLoader from './gallery-loader';
import useGallery from '../useGallery';
import ImageCard from './ImageCard';
import SearchBox from './search';

interface Props {
  uploads: Upload[];
}
const Gallery = ({ uploads }: Props) => {
  const {
    currentHover,
    dragItem,
    handlSorting,
    handleDragEnter,
    images,
    loading,
  } = useGallery({ uploads });
  return (
    <section className='w-full-h-full'>
      <SearchBox images={images} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {loading ? <GalleryLoader count={4} /> : null}
        {!loading ? (
          <Fragment>
            {images.length > 0 &&
              images.map((image, index) => (
                <ImageCard
                  index={index}
                  media={image}
                  key={image.id}
                  currentHover={currentHover}
                  dragItem={dragItem}
                  handlSorting={handlSorting}
                  handleDragEnter={handleDragEnter}
                />
              ))}
          </Fragment>
        ) : (
          <p>No image found!</p>
        )}
      </div>
    </section>
  );
};

export default Gallery;
