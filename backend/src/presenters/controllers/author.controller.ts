import { injectable, inject } from "tsyringe";

import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { Request, Response } from "express";
import { FindAuthorById } from "@application/use-cases/author/find-author-by-id.use-case";
import { Author } from "@domain/entities/author.entity";
import { FindAllAuthors } from "@application/use-cases/author/find-all-authors.use-case";
import { UpdateAuthor } from "@application/use-cases/author/update-author.use-case";

@injectable()
export class AuthorController {
  constructor(
    @inject(CreateAuthor) private readonly createAuthorUseCase: CreateAuthor,
    @inject(FindAuthorById)
    private readonly findAuthorByIdUseCase: FindAuthorById,
    @inject(FindAllAuthors)
    private readonly findAllAuthorsUseCase: FindAllAuthors,
    @inject(UpdateAuthor)
    private readonly updateAuthorUseCase: UpdateAuthor
  ) {}

  async createAuthor(req: Request, res: Response): Promise<Response> {
    const { name, birthDate } = req.body;

    try {
      const createdAuthor = await this.createAuthorUseCase.execute({
        name,
        birthDate,
      });
      return res.status(201).json(createdAuthor);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }

  async findAuthor(req: Request, res: Response): Promise<Response> {
    const response = await this.findAuthorByIdUseCase.execute(req.params.id);

    return res.status(201).json(response);
  }

  async findAllAuthors(_: Request, res: Response): Promise<Response> {
    const response = await this.findAllAuthorsUseCase.execute();

    return res.status(201).json(response);
  }

  async updateAuthor(req: Request, res: Response): Promise<Response> {
    const response = await this.updateAuthorUseCase.execute(
      req.params.id,
      req.body
    );

    return res.status(201).json(response);
  }
}
