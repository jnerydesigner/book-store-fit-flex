import "reflect-metadata";

import { BookRepository } from "@infra/repository/book.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteBookUseCase {
  constructor(
    @inject("BookRepository") readonly bookRepository: BookRepository
  ) {}

  async execute(bookId: string): Promise<void> {
    await this.bookRepository.delete(bookId);
  }
}
