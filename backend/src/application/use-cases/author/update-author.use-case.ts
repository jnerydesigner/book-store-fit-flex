import { Author } from "@domain/entities/author.entity";
import { AuthorRepository } from "@infra/repository/author.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateAuthor {
  constructor(
    @inject("AuthorRepository")
    private readonly authorRepository: AuthorRepository
  ) {}
  async execute(authorId: string, authorInput: Input): Promise<Author> {
    const author = new Author(
      authorId,
      authorInput.name,
      authorInput.birthDate
    );

    return await this.authorRepository.updateAuthor(authorId, author);
  }
}

type Input = {
  id: string;
  name: string;
  birthDate: string;
};
