import { AuthorController } from "@controllers/author.controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

router.get("/authors/find-all", async (req, res) => {
  const authorController = container.resolve(AuthorController);

  return authorController.findAllAuthors(req, res);
});

router.get("/authors/:id", async (req, res) => {
  const authorController = container.resolve(AuthorController);

  return authorController.findAuthor(req, res);
});

router.post("/authors", async (req, res) => {
  const authorController = container.resolve(AuthorController);

  return authorController.createAuthor(req, res);
});

router.patch("/authors/:id", async (req, res) => {
  const authorController = container.resolve(AuthorController);

  return authorController.updateAuthor(req, res);
});

export { router as authorRouter };
