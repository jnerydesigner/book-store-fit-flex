import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { UseCase } from "../use-case";

export class DeleteBook {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}

  async execute(bookId: string): Promise<void> {
    await this.bookRepository.delete(bookId);
  }
}
