import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

export class FindBookByTitle {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}
  execute(title: string): Promise<Book> {
    return this.bookRepository.findByTitle(title);
  }
}
