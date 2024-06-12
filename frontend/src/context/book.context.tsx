import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
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
  booksContext: IBook[];
  setBooksContext?: React.Dispatch<React.SetStateAction<IBook[]>>;
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
}

const BookContext = createContext<IBookContextProps | undefined>(undefined);

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [booksContext, setBooksContext] = useState<IBook[]>([]);
  const [author, setAuthor] = useState<string>("");
  useEffect(() => {
    const booksFindAll = async () => {
      const response = await axios.get("http://localhost:3333/books/find-all");

      setBooksContext(response.data);
    };
    booksFindAll();
  }, []);

  return (
    <BookContext.Provider
      value={{ booksContext, setBooksContext, author, setAuthor }}
    >
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
