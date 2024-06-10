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
}

const BookContext = createContext<IBookContextProps | undefined>(undefined);

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    booksFindAll();
  }, []);

  const booksFindAll = async () => {
    const response = await fetch("http://localhost:3333/books/find-all");
    const data = await response.json();
    setBooks(data);
  };

  return (
    <BookContext.Provider value={{ books }}>{children}</BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
