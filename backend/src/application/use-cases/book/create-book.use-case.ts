import { Book } from "@domain/entities/book.entity";
import { BookMapperResponse } from "@infra/mapper/books.mapper";
import { BookRepository } from "@infra/repository/book.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateBook {
  constructor(
    @inject("BookRepository") readonly bookRepository: BookRepository
  ) {}

  async execute(bookInput: Input) {
    const book = Book.create(
      bookInput.title,
      bookInput.authorId,
      bookInput.releaseDate,
      bookInput.description,
      bookInput.imageUrl
    );

    return await this.bookRepository.save(book);
  }
}

type Input = {
  title: string;
  authorId: string;
  releaseDate: string;
  description: string;
  imageUrl?: string;
  id?: string;
};
