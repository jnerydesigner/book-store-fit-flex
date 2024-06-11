import { createBrowserRouter } from "react-router-dom";
import { BookDetail } from "../pages/book-detail";
import { Home } from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book/:book_id",
    element: <BookDetail />,
  },
]);
