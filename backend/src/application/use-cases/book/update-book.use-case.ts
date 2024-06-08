import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

export class UpdateBook {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}
  execute(id: string, bookInput: Input): Promise<Book> {
    const book = new Book(
      bookInput.id,
      bookInput.title,
      bookInput.author,
      bookInput.releaseDate,
      bookInput.description
    );


    return this.bookRepository.updateBook(id, book);
  }
}

type Input = {
  title: string;
  author: string;
  releaseDate: string;
  description: string;
  id?: string;
};
