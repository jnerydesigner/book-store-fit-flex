import { Book } from "@domain/entities/book.entity";

export interface BookRepository {
  save(book: Book): Promise<void>;
  findAll(): Promise<Book[]>;
}

export class BookRepositoryInMemory implements BookRepository {
  private books: Book[] = [];

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async findOneById(id: string): Promise<Book | undefined> {
    const response = await this.books.find((book) => book.id === id);
    if (!response) {
      return undefined;
    }

    return response;
  }
}
