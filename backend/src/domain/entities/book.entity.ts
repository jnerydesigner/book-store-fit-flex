import { randomUUID } from "crypto";

export class Book {
  constructor(
    readonly title: string,
    readonly author: string,
    readonly releaseDate: string,
    readonly description: string,
    readonly id: string
  ) {}

  static create(
    title: string,
    author: string,
    releaseDate: string,
    description: string,
    id?: string
  ) {
    let bookId = "";
    if (id === undefined || id === null || id === "") {
      bookId = randomUUID();
    }

    bookId = id;

    return new Book(title, author, releaseDate, description, bookId);
  }
}
