import { Author } from "@domain/entities/author.entity";

export interface AuthorRepository {
  create(author: Author): Promise<Author>;
  findAuthorByName(name: string): Promise<Author | undefined>;
  findAuthorById(name: string): Promise<Author | undefined>;
  updateAuthor(authorId: string, author: Author): Promise<Author>;
}

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
