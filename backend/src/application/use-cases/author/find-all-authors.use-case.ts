import { AuthorRepository } from "@infra/repository/author.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllAuthors {
  constructor(
    @inject("AuthorRepository") private authorRepository: AuthorRepository
  ) {}
  async execute() {
    return await this.authorRepository.findAllAuthors();
  }
}
