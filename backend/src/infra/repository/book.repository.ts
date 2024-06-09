import { IBook } from "@application/types/book.type";
import { Book } from "@domain/entities/book.entity";
import { PrismaService } from "@infra/database/client/prisma.client";
import { LoggerService } from "@infra/logger/logger.service";
import { BookMapperResponse, BooksMapper } from "@infra/mapper/books.mapper";
import { inject, injectable } from "tsyringe";

export interface BookRepository {
  save(book: Book): Promise<Book | BookMapperResponse>;
  findAll(): Promise<Book[] | any[]>;
  findOneById(id: string): Promise<Book | BookMapperResponse>;
  delete(id: string): Promise<void>;
  findByTitle(title: string): Promise<Book | undefined>;
  updateBook(bookId: string, book: Book): Promise<Book>;
}

@injectable()
export class BookRepositoryPostgres implements BookRepository {
  constructor(
    @inject(LoggerService) private readonly logger: LoggerService,
    @inject(PrismaService) private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<Book[] | IBook[]> {
    const books = await this.prismaService.book.findMany({
      include: {
        Author: {
          select: {
            name: true,
          },
        },
      },
    });

    await this.prismaService.disconnect();
    return books;
  }
  async save(book: Book): Promise<Book | IBook> {
    const existsTitle = await this.prismaService.book.findFirst({
      where: {
        title: book.title,
      },
    });

    if (existsTitle) {
      throw new Error("Book already exists");
    }

    const authorExists = await this.prismaService.author.findFirst({
      where: {
        id: book.authorId,
      },
    });

    if (!authorExists) {
      throw new Error("Author not found");
    }

    await this.prismaService.book.create({
      data: {
        title: book.title,
        releaseDate: book.releaseDate,
        description: book.description,
        authorId: book.authorId,
        imageUrl: book.imageUrl,
        id: book.id,
      },
    });

    const responseFindIdBook = await this.findOneById(book.id);

    return responseFindIdBook;
  }

  async findOneById(id: string): Promise<Book | IBook> {
    const bookAlreadyExists: IBook = await this.prismaService.book.findFirst({
      where: {
        id,
      },
      include: {
        Author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(bookAlreadyExists);

    if (!bookAlreadyExists) {
      throw new Error("Book not found");
    }

    return bookAlreadyExists;
  }
  async delete(id: string): Promise<void> {
    const book = await this.findOneById(id);

    if (!book) {
      throw new Error("Book not found");
    }

    await this.prismaService.book.delete({
      where: {
        id,
      },
    });
  }
  async findByTitle(title: string): Promise<Book> {
    const existTitle = await this.prismaService.book.findFirst({
      where: {
        title,
      },
    });

    if (!existTitle) {
      throw new Error("Book not found");
    }

    return existTitle;
  }
  async updateBook(bookId: string, bookInput: Book): Promise<Book | IBook> {
    let book = await this.findOneById(bookId);

    book = {
      id: book.id,
      ...bookInput,
    };

    if (!book) {
      throw new Error("Book not found");
    }

    const authorExists = await this.prismaService.author.findFirst({
      where: {
        id: book.authorId,
      },
    });

    if (!authorExists) {
      throw new Error("Author not found");
    }

    return await this.prismaService.book.update({
      where: {
        id: bookId,
      },
      data: book,
    });
  }
}

export class BookRepositoryInMemory implements BookRepository {
  private books: Book[] = [];

  async save(bookSave: Book): Promise<Book | BookMapperResponse> {
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
