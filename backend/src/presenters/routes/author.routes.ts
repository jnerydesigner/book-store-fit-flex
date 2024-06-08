import { AuthorController } from "@controllers/author.controller";
import { Router } from "express";
import { container } from "tsyringe";

const router = Router();

router.post("/authors", async (req, res) => {
  const authorController = container.resolve(AuthorController);

  return authorController.createAuthor(req, res);
});

router.get("/authors/:id", async (req, res) => {
  const idAuthor = req.params.id;
  console.log(idAuthor);

  const authorController = container.resolve(AuthorController);

  return authorController.findAuthor(idAuthor);
});

export { router as authorRouter };
