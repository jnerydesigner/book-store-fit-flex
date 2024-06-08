import { AuthorRepository } from "@infra/repository/author.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAuthorById {
  constructor(
    @inject("AuthorRepository") private authorRepository: AuthorRepository
  ) {}
  async execute(authorId: string) {
    const author = await this.authorRepository.findAuthorById(authorId);
    return author;
  }
}
