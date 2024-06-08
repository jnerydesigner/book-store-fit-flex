import { AuthorRepository } from "@infra/repository/author.repository";

export class FindAuthorById {
  constructor(private readonly authorRepository: AuthorRepository) {}
  async execute(authorId: string) {
    const author = await this.authorRepository.findAuthorById(authorId);
    return author;
  }
}
