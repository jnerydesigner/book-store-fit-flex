import { Book, Author as AuthorDB } from "@prisma/client";

export class BooksMapper {
  static toResponse(
    responseBook: Book,
    responseAuthor: AuthorDB
  ): BookMapperResponse {
    return {
      id: responseBook.id,
      title: responseBook.title,
      releaseDate: responseBook.releaseDate,
      description: responseBook.description,
      Author: {
        name: responseAuthor.name,
      },
    };
  }
}

type Author = {
  name: string;
};

export type BookMapperResponse = {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  Author: Author;
};
