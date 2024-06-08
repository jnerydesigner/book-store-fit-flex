import { BookRepositoryInMemory } from "@infra/repository/book.repository";

export class DeleteBook {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}

  async execute(bookId: string): Promise<void> {
    await this.bookRepository.delete(bookId);
  }
}
