import { injectable, inject } from "tsyringe";

import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { Request, Response } from "express";
import { FindAuthorById } from "@application/use-cases/author/find-author-by-id.use-case";
import { Author } from "@domain/entities/author.entity";

@injectable()
export class AuthorController {
  constructor(
    @inject(CreateAuthor) private readonly createAuthorService: CreateAuthor,
    @inject(FindAuthorById)
    private readonly findAuthorByIdService: FindAuthorById
  ) {}

  async createAuthor(req: Request, res: Response): Promise<Response> {
    const { name, birthDate } = req.body;

    try {
      const createdAuthor = await this.createAuthorService.execute({
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

  async findAuthor(id: string): Promise<Author> {
    return this.findAuthorByIdService.execute(id);
  }
}
