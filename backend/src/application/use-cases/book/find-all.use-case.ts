import { Book } from "@domain/entities/book.entity";
import { BookRepository } from "@infra/repository/book.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllBooksUseCase {
  constructor(
    @inject("BookRepository") readonly bookRepository: BookRepository
  ) {}

  async execute(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
