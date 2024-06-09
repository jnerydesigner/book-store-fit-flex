import { randomUUID } from "crypto";

export class Book {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly authorId: string,
    readonly releaseDate: string,
    readonly description: string,
    readonly imageUrl?: string
  ) {}

  static create(
    title: string,
    authorId: string,
    releaseDate: string,
    description: string,
    imageUrl?: string
  ) {
    const bookId = randomUUID();

    return new Book(
      bookId,
      title,
      authorId,
      releaseDate,
      description,
      imageUrl
    );
  }
}
