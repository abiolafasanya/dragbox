'use client';

import {
  DndContext,
  closestCenter,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import GalleryImages from './gallery-image';
import useGallery from '../../useGallery';
import SearchBox from '../search';
import { useEffect, useState } from 'react';

const Gallery = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
  const { handleDragEnd, images, filterGallery, currentHover, reset, loading } =
    useGallery();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 50, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(
        () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    }
  }, []);

  return (
    <section className=''>
      <SearchBox images={images} filter={filterGallery} reset={reset} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className='w-full'>
          <GalleryImages
            isLoading={loading}
            currentHover={currentHover as number}
            images={images}
            isTouchDevice={isTouchDevice}
          />
        </div>
      </DndContext>
    </section>
  );
};

export default Gallery;
