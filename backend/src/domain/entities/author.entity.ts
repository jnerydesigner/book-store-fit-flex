import { randomUUID } from "crypto";

export class Author {
  constructor(
    readonly authorId: string,
    readonly name: string,
    readonly birthDate: string
  ) {}

  static createAuthor(name: string, birthDate: string) {
    const authorId = randomUUID();

    return new Author(authorId, name, birthDate);
  }
}
