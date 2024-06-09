import { Book } from "@domain/entities/book.entity";
import { BookRepository } from "@infra/repository/book.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdUseCase {
  constructor(
    @inject("BookRepository") readonly bookRepository: BookRepository
  ) {}
  async execute(id: string): Promise<Book | any> {
    return this.bookRepository.findOneById(id);
  }
}
