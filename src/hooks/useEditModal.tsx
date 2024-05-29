import { DocumentData } from "firebase/firestore";
import { ReactNode, createContext, useContext, useState } from "react";

interface IEditModalContext {
  handleEditModal(): void;
  openEditModal: boolean;
  toggleEditModal(): void;
  handleSelectItem(data: DocumentData): void;
  selectedItem: DocumentData | null;
}

const EditModalContext = createContext({} as IEditModalContext);

export const EditModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DocumentData | null>(null);

  function handleSelectItem(data: DocumentData) {
    setSelectedItem(data);
  }

  function toggleEditModal() {
    setOpenEditModal((open) => !open);
  }

  function handleEditModal() {}

  const value = {
    handleEditModal,
    openEditModal,
    toggleEditModal,
    selectedItem,
    handleSelectItem,
  };

  return (
    <EditModalContext.Provider value={value}>
      {children}
    </EditModalContext.Provider>
  );
};

export function useEditModal() {
  return useContext(EditModalContext);
}
