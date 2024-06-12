import { FindAllBooksUseCase } from "@application/use-cases/book/find-all.use-case";
import { Author } from "@domain/entities/author.entity";
import { inject, injectable } from "tsyringe";

import { LoggerService } from "@infra/logger/logger.service";
import { PrismaService } from "@infra/database/client/prisma.client";

export interface AuthorRepository {
  create(author: Author): Promise<Author>;
  findAuthorByName(name: string): Promise<Author | undefined>;
  findAuthorById(name: string): Promise<Author | undefined>;
  updateAuthor(authorId: string, author: Author): Promise<Author>;
  findAllAuthors(): Promise<Author[]>;
}

@injectable()
export class AuthorRepositoryPostgres implements AuthorRepository {
  constructor(
    @inject(LoggerService) private readonly logger: LoggerService,
    @inject(PrismaService) private readonly prismaService: PrismaService
  ) {}
  async findAllAuthors(): Promise<Author[]> {
    const authors = await this.prismaService.author.findMany();

    await this.prismaService.disconnect();

    return authors;
  }
  async create(author: Author): Promise<Author> {
    await this.findAuthorByName(author.name);

    const authorCreate = await this.prismaService.author.create({
      data: {
        name: author.name,
        birthDate: author.birthDate,
        id: author.id,
      },
    });

    this.logger.info(JSON.stringify(authorCreate));

    await this.prismaService.disconnect();

    return authorCreate;
  }
  async findAuthorByName(name: string): Promise<Author> {
    const authorAlreadyExists = await this.prismaService.author.findFirst({
      where: {
        name,
      },
    });

    if (authorAlreadyExists) {
      throw new Error("Author already exists");
    }

    return authorAlreadyExists;
  }
  async findAuthorById(id: string): Promise<Author> {
    const authorAlreadyExists = await this.prismaService.author.findFirst({
      where: {
        id,
      },
    });

    if (!authorAlreadyExists) {
      return;
    }

    await this.prismaService.disconnect();

    return authorAlreadyExists;
  }
  async updateAuthor(authorId: string, author: Author): Promise<Author> {
    let data = await this.findAuthorById(authorId);

    data = {
      id: authorId,
      ...author,
    };

    const updatedAuthor = await this.prismaService.author.update({
      where: {
        id: authorId,
      },
      data,
    });

    return updatedAuthor;
  }
}

export class AuthorRepositoryInMemory implements AuthorRepository {
  findAllAuthors(): Promise<Author[]> {
    throw new Error("Method not implemented.");
  }
  authors: Author[] = [];

  async create(author: Author): Promise<Author> {
    const authorAlreadyExists = this.authors.find(
      (author) => author.name === author.name
    );

    if (authorAlreadyExists) {
      throw new Error("Author already exists");
    }

    this.authors.push(author);

    return author;
  }

  async findAuthorByName(name: string): Promise<Author> {
    const author = this.authors.find((author) => author.name === name);
    if (author) {
      throw new Error("Author already exists");
    }

    return;
  }

  async findAuthorById(id: string): Promise<Author> {
    const author = this.authors.find((author) => author.id === id);

    if (!author) {
      throw new Error("Author not found");
    }

    return author;
  }

  async updateAuthor(authorId: string, author: Author): Promise<Author> {
    let authorResponse = this.authors.find((author) => author.id === authorId);
    if (!authorResponse) {
      throw new Error("Author not found");
    }

    authorResponse = {
      ...author,
    };

    return authorResponse;
  }
}
