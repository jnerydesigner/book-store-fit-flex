import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

export class FindAll {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}

  async execute(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
