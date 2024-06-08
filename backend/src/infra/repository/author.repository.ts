import { Author } from "@domain/entities/author.entity";
import { inject, injectable } from "tsyringe";
import Prisma from "@prisma/client";
import { LoggerService } from "@infra/logger/logger.service";

export interface AuthorRepository {
  create(author: Author): Promise<Author>;
  findAuthorByName(name: string): Promise<Author | undefined>;
  findAuthorById(name: string): Promise<Author | undefined>;
  updateAuthor(authorId: string, author: Author): Promise<Author>;
}

@injectable()
export class AuthorRepositoryPostgres implements AuthorRepository {
  prismaService: Prisma.PrismaClient;
  constructor(@inject(LoggerService) private readonly logger: LoggerService) {
    this.prismaService = new Prisma.PrismaClient();
  }
  async create(author: Author): Promise<Author> {
    const authorAlreadyExists = await this.prismaService.author.findFirst({
      where: {
        name: author.name,
      },
    });
    if (authorAlreadyExists) {
      throw new Error("Author already exists");
    }

    const authorCreate = await this.prismaService.author.create({
      data: {
        name: author.name,
        birthDate: author.birthDate,
        authorId: author.authorId,
      },
    });

    this.logger.info(JSON.stringify(authorCreate));

    return authorCreate;
  }
  findAuthorByName(name: string): Promise<Author> {
    throw new Error("Method not implemented.");
  }
  async findAuthorById(id: string): Promise<Author> {
    const authorAlreadyExists = await this.prismaService.author.findFirst({
      where: {
        authorId: id,
      },
    });

    if (!authorAlreadyExists) {
      throw new Error("Author not found");
    }

    return authorAlreadyExists;
  }
  updateAuthor(authorId: string, author: Author): Promise<Author> {
    throw new Error("Method not implemented.");
  }
}

@injectable()
export class AuthorRepositoryInMemory implements AuthorRepository {
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
    const author = this.authors.find((author) => author.authorId === id);

    if (!author) {
      throw new Error("Author not found");
    }

    return author;
  }

  async updateAuthor(authorId: string, author: Author): Promise<Author> {
    let authorResponse = this.authors.find(
      (author) => author.authorId === authorId
    );
    if (!authorResponse) {
      throw new Error("Author not found");
    }

    authorResponse = {
      ...author,
    };

    return authorResponse;
  }
}
