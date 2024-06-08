import { Author } from "@domain/entities/author.entity";
import { AuthorRepository } from "@infra/repository/author.repository";

export class CreateAuthor {
  constructor(private readonly authorRepository: AuthorRepository) {}
  async execute(authorInput: Input): Promise<Author> {
    const author = Author.createAuthor(authorInput.name, authorInput.birthDate);
    return await this.authorRepository.create(author);
  }
}

type Input = {
  name: string;
  birthDate: string;
};
