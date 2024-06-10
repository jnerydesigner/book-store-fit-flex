import { injectable, inject } from "tsyringe";

import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { Request, Response } from "express";
import { FindAuthorById } from "@application/use-cases/author/find-author-by-id.use-case";
import { Author } from "@domain/entities/author.entity";
import { FindAllAuthors } from "@application/use-cases/author/find-all-authors.use-case";
import { UpdateAuthor } from "@application/use-cases/author/update-author.use-case";
import { FindAllBooksUseCase } from "@application/use-cases/book/find-all.use-case";
import { CreateBook as CreateBookUseCase } from "@application/use-cases/book/create-book.use-case";
import { FindByIdUseCase } from "@application/use-cases/book/find-by-id.use-case";
import { UpdateBookUseCase } from "@application/use-cases/book/update-book.use-case";

@injectable()
export class BookController {
  constructor(
    @inject(FindAllBooksUseCase)
    private readonly findAllBookUseCase: FindAllBooksUseCase,
    @inject(CreateBookUseCase)
    private readonly createBookUseCase: CreateBookUseCase,

    @inject(FindByIdUseCase)
    private readonly findBookIdUseCase: FindByIdUseCase,
    @inject(UpdateBookUseCase)
    private readonly updateBookUseCase: UpdateBookUseCase
  ) {}

  async findAllBooks(_: Request, res: Response): Promise<Response> {
    const response = await this.findAllBookUseCase.execute();

    return res.status(201).json(response);
  }

  async findOneById(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.findBookIdUseCase.execute(req.params.id);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }

  async createBook(req: Request, res: Response): Promise<Response> {
    const { title, author, releaseDate, description, imageUrl } = req.body;

    try {
      const response = await this.createBookUseCase.execute({
        title,
        author,
        releaseDate,
        description,
        imageUrl,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }

  async updateBook(req: Request, res: Response): Promise<Response> {
    const { title, author, releaseDate, description, imageUrl } = req.body;

    try {
      const response = await this.updateBookUseCase.execute(req.params.id, {
        title,
        author,
        releaseDate,
        description,
        imageUrl,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
