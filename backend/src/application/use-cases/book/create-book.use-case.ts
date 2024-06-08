import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { UseCase } from "../use-case";

export class CreateBook {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}

  async execute(bookInput: Input): Promise<Book> {
    const book = Book.create(
      bookInput.title,
      bookInput.author,
      bookInput.releaseDate,
      bookInput.description
    );
    return await this.bookRepository.save(book);
  }
}

type Input = {
  title: string;
  author: string;
  releaseDate: string;
  description: string;
  id?: string;
};
