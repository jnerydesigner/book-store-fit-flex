import { randomUUID } from "crypto";

export class Book {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly author: string,
    readonly releaseDate: string,
    readonly description: string,
  ) {}

  static create(
    title: string,
    author: string,
    releaseDate: string,
    description: string,
  ) {
    const bookId = randomUUID();

    return new Book(bookId, title, author, releaseDate, description);
  }
}
