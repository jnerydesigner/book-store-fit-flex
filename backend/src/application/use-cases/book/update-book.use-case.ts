import "reflect-metadata";

import { Book } from "@domain/entities/book.entity";
import { BookRepository } from "@infra/repository/book.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateBookUseCase {
  constructor(
    @inject("BookRepository") readonly bookRepository: BookRepository
  ) {}
  execute(id: string, bookInput: Input): Promise<Book> {
    const book = new Book(
      bookInput.id,
      bookInput.title,
      bookInput.author,
      bookInput.releaseDate,
      bookInput.description,
      bookInput.imageUrl
    );

    return this.bookRepository.updateBook(id, book);
  }
}

type Input = {
  title: string;
  author: string;
  releaseDate: string;
  description: string;
  imageUrl?: string;
  id?: string;
};
