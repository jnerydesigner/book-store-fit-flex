import { injectable, inject } from "tsyringe";

import { Request, Response } from "express";
import { FindAllBooksUseCase } from "@application/use-cases/book/find-all.use-case";
import { CreateBook as CreateBookUseCase } from "@application/use-cases/book/create-book.use-case";
import { FindByIdUseCase } from "@application/use-cases/book/find-by-id.use-case";
import { UpdateBookUseCase } from "@application/use-cases/book/update-book.use-case";
import { DeleteBookUseCase } from "@application/use-cases/book/delete-book.use-case";

export interface Params {
  titleSearch: string;
  descriptionSearch: string;
}

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
    private readonly updateBookUseCase: UpdateBookUseCase,
    @inject(DeleteBookUseCase)
    private readonly deleteBookUseCase: DeleteBookUseCase
  ) {}

  async findAllBooks(
    request: Request<{}, {}, {}, Params>,
    res: Response
  ): Promise<Response> {
    const { query } = request;
    const response = await this.findAllBookUseCase.execute(
      query.titleSearch,
      query.descriptionSearch
    );

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

  async deleteBook(req: Request, res: Response): Promise<Response> {
    await this.deleteBookUseCase.execute(req.params.id);
    return res
      .status(201)
      .json({ message: `Book id ${req.params.id} was successfully deleted` });
  }
}
