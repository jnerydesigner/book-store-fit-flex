import { Book } from "@domain/entities/book.entity";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

export class FindById {
  constructor(readonly bookRepository: BookRepositoryInMemory) {}
  execute(id: string): Promise<Book> {
    return this.bookRepository.findOneById(id);
  }
}
