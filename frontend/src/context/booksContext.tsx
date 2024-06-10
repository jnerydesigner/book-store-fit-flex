import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface IBook {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  authorId: string;
  imageUrl: string;
  Author: {
    name: string;
  };
}

interface IBookContextProps {
  books: IBook[];
  setBooks?: React.Dispatch<React.SetStateAction<IBook[]>>;
}

const BookContext = createContext<IBookContextProps | undefined>(undefined);

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    const booksFindAll = async () => {
      const response = await fetch("http://localhost:3333/books/find-all");
      const data = await response.json();
      setBooks(data);
    };
    booksFindAll();
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
