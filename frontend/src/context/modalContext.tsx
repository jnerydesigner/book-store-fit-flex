import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  showModal: boolean;
  toggleModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModalEdit: boolean;
  toggleModalEdit: () => void;
  setShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const toggleModalEdit = () => {
    setShowModalEdit((prevState) => !prevState);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        toggleModal,
        setShowModal,
        showModalEdit,
        toggleModalEdit,
        setShowModalEdit,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
