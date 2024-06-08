import { Book } from "@domain/entities/book.entity";

export interface BookRepository {
  save(book: Book): Promise<Book>;
  findAll(): Promise<Book[]>;
  findOneById(id: string): Promise<Book | undefined>;
  delete(id: string): Promise<void>;
  findByTitle(title: string): Promise<Book | undefined>;
  updateBook(bookId: string, book: Book): Promise<Book>;
}

export class BookRepositoryInMemory implements BookRepository {
  private books: Book[] = [];

  async save(bookSave: Book): Promise<Book> {
    const bookAlreadyExists = this.books.find(
      (book) => book.title === bookSave.title
    );

    if (bookAlreadyExists) {
      throw new Error("Book already exists");
    }

    this.books.push(bookSave);

    return bookSave;
  }

  async findByTitle(title: string): Promise<Book> {
    const bookAlreadyExists = this.books.find((book) => book.title === title);

    if (!bookAlreadyExists) {
      throw new Error("Book not found");
    }

    return bookAlreadyExists;
  }

  async findOneById(id: string): Promise<Book | undefined> {
    const response = this.books.find((book) => book.id === id);

    if (!response) {
      throw new Error("Book not found");
    }

    return response;
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async delete(id: string): Promise<void> {
    await this.findOneById(id);
    this.books = this.books.filter((book) => book.id !== id);
  }

  async updateBook(id: string, bookUpdate: Book): Promise<Book> {
    let response = this.books.find((book) => book.id === id);

    if (!response) {
      throw new Error("Book not found");
    }

    response = {
      ...bookUpdate,
    };

    return response;
  }
}
