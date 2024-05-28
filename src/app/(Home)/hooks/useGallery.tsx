"use client";

import { useToast } from "@/components/ui/use-toast";
import Axios from "@/lib/Axios";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageDataFile } from "@/types/";

interface I_ImageContext {
  images: ImageDataFile[];
  searchList: ImageDataFile[];
  loading: boolean;
  handlSorting: (e: React.DragEvent<HTMLDivElement>) => void;
  filterGallery: (tag: string) => Promise<void>;
  setImages: Dispatch<SetStateAction<ImageDataFile[]>>;
  handleDragEnd: ({ active, over }: any) => void;
  reset: () => void;
  dragItem: MutableRefObject<any>;
  dragOverItem: MutableRefObject<any>;
  currentHover: number | null;
  handleDragEnter: (index: number) => void;
}

const ImageContext = createContext({} as I_ImageContext);

export function ImageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [images, setImages] = useState<ImageDataFile[]>([]);
  const [loading, setLoading] = useState(true);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [currentHover, setCurrentHover] = useState<number | null>(null);
  const { toast } = useToast();
  const [searchList, setSearchList] = useState<ImageDataFile[]>([]);

  async function fetchPexelsApi() {
    const endpoint = `https://api.pexels.com/v1/curated?page=2&per_page=40`;
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API;
    const { data, status } = await Axios.get<{ photos: ImageDataFile[] }>(
      endpoint,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    return data;
  }

  async function updateGallery() {
    const data = await fetchPexelsApi();
    if (data) {
      setImages(data.photos);
    }
    setImages((images) => images);
    setLoading(false);
  }

  function reset() {
    updateGallery();
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (
      !active.data.current ||
      !active.data.current.sortable ||
      !over ||
      !over.data.current ||
      !over.data.current.sortable
    ) {
      return;
    }

    const imagesCopy = [...images];
    const [draggedImage] = imagesCopy.splice(
      active.data.current.sortable.index,
      1
    );

    imagesCopy.splice(over.data.current.sortable.index, 0, draggedImage);
    setImages(imagesCopy);
  };

  async function filterGallery(tag: string) {
    if (tag.length < 3) {
      setSearchList([]);
      return;
    }
    const searchApi = async () => {
      const endpoint = `https://api.pexels.com/v1/search?query=${tag}`;
      const apiKey = process.env.NEXT_PUBLIC_PEXELS_API;
      const { data, status } = await Axios.get<{ photos: ImageDataFile[] }>(
        endpoint,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      return data;
      // console.log(data.photos);
    };
    const result = await searchApi();
    setSearchList(result.photos);
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

    dragItem.current = null;
    dragOverItem.current = null;
    setCurrentHover(null);
    setImages(_images);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        searchList,
        dragItem,
        dragOverItem,
        currentHover,
        handlSorting,
        handleDragEnter,
        loading,
        reset,
        filterGallery,
        handleDragEnd,
        setImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useGallery() {
  return useContext(ImageContext);
}
