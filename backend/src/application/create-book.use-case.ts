import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

export class CreateBook {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}

  async execute(bookInput: Input): Promise<void> {
    const book = Book.create(
      bookInput.title,
      bookInput.author,
      bookInput.release_date,
      bookInput.description,
      bookInput.id
    );
    await this.bookRepository.save(book);
  }
}

type Input = {
  title: string;
  author: string;
  release_date: string;
  description: string;
  id?: string;
};
