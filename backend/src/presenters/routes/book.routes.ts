import { BookController, Params } from "@controllers/book.controller";
import { Request, Router } from "express";
import { container } from "tsyringe";

const router = Router();

router.get("/books/find-all", async (req: Request<{}, {}, {}, Params>, res) => {
  const authorController = container.resolve(BookController);

  return authorController.findAllBooks(req, res);
});

router.get("/books/:id", async (req, res) => {
  const authorController = container.resolve(BookController);

  return authorController.findOneById(req, res);
});

router.post("/books/create", async (req, res) => {
  const authorController = container.resolve(BookController);

  return authorController.createBook(req, res);
});

router.patch("/books/:id", async (req, res) => {
  const authorController = container.resolve(BookController);

  return authorController.updateBook(req, res);
});

router.delete("/books/:id", async (req, res) => {
  const authorController = container.resolve(BookController);

  return authorController.deleteBook(req, res);
});

export { router as bookRouter };
