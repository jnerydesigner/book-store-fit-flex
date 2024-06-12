import { IBook } from "@application/types/book.type";
import { Author } from "@domain/entities/author.entity";
import { Book } from "@domain/entities/book.entity";
import { PrismaService } from "@infra/database/client/prisma.client";
import { limitWord } from "@infra/helpers/limit-word.helper";
import { LoggerService } from "@infra/logger/logger.service";
import { BookMapperResponse } from "@infra/mapper/books.mapper";
import { inject, injectable } from "tsyringe";

export interface BookRepository {
  save(book: Book): Promise<Book | BookMapperResponse>;
  findAll(
    titleSearch?: string,
    descriptionSearch?: string
  ): Promise<Book[] | any[]>;
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
  async findAll(
    titleSearch: string,
    descriptionSearch: string
  ): Promise<Book[] | IBook[]> {
    let books = await this.prismaService.book.findMany({
      where: {
        title: {
          contains: titleSearch,
        },
        description: {
          contains: descriptionSearch,
        },
      },
      include: {
        Author: {
          select: {
            name: true,
          },
        },
      },
    });

    const booksMap = books.map((book) => {
      return {
        id: book.id,
        title: book.title,
        releaseDate: book.releaseDate,
        authorId: book.authorId,
        description: limitWord(book.description, 20),
        imageUrl: book.imageUrl,
        Author: {
          name: book.Author.name,
        },
      };
    });

    return booksMap;
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

    let author = await this.prismaService.author.findFirst({
      where: {
        name: book.authorId,
      },
    });

    if (!author) {
      author = Author.createAuthor(book.authorId, "2021-09-01");
      await this.prismaService.author.create({
        data: author,
      });
    }

    await this.prismaService.book.create({
      data: {
        title: book.title,
        releaseDate: book.releaseDate,
        description: book.description,
        authorId: author.id,
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
      include: {
        Author: true,
      },
    });

    if (!existTitle) {
      throw new Error("Book not found");
    }

    const bookResponse = new Book(
      existTitle.id,
      existTitle.title,
      existTitle.Author.name,
      existTitle.releaseDate,
      existTitle.description,
      existTitle.imageUrl
    );

    return bookResponse;
  }
  async updateBook(bookId: string, bookInput: Book): Promise<Book> {
    let book = await this.findOneById(bookId);

    book = {
      ...bookInput,
      id: bookId,
    };

    if (!book) {
      throw new Error("Book not found");
    }

    let author = await this.prismaService.author.findFirst({
      where: {
        name: book.authorId,
      },
    });

    if (!author) {
      author = Author.createAuthor(book.authorId, "2021-09-01");
      await this.prismaService.author.create({
        data: author,
      });
    }

    const responseUpdate = await this.prismaService.book.update({
      where: {
        id: book.id,
      },
      data: {
        ...book,
        authorId: author.id,
      },
      include: {
        Author: true,
      },
    });

    return responseUpdate;
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
