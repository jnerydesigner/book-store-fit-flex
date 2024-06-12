import "reflect-metadata";

import { Book } from "@domain/entities/book.entity";

import { BookRepository } from "@infra/repository/book.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateBook {
  constructor(
    @inject("BookRepository") readonly bookRepository: BookRepository
  ) {}

  async execute(bookInput: InputBook) {
    const book = Book.create(
      bookInput.title,
      bookInput.author,
      bookInput.releaseDate,
      bookInput.description,
      bookInput.imageUrl
    );

    return await this.bookRepository.save(book);
  }
}

export type InputBook = {
  title: string;
  author: string;
  releaseDate: string;
  description: string;
  imageUrl?: string;
  id?: string;
};
