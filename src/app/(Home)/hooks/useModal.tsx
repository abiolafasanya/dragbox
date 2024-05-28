import React, { ReactNode, createContext, useContext, useState } from "react";

interface ICarouselContext {
  isOpen: boolean;
  toggleModal: () => void;
  modalIndex: number;
  updateModalIndex: (index: number) => void;
}

const CarouselContext = createContext({} as ICarouselContext);

export function CarouselProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((open) => !open);
  const [modalIndex, setModalIndex] = useState<number>(0);
  function updateModalIndex(index: number) {
    setModalIndex(index);
  }
  const value = { isOpen, toggleModal, modalIndex, updateModalIndex };
  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
}

export const useModal = () => useContext(CarouselContext);
