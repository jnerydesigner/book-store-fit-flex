import { AuthorRepository } from "@infra/repository/author.repository";
import { Author } from "@prisma/client";

export const authorRepositoryMock: AuthorRepository = {
  create: jest
    .fn()
    .mockImplementation((author: Author) => Promise.resolve(author)),
  findAuthorByName: jest
    .fn()
    .mockImplementation((name: string) => Promise.resolve(undefined)),
  findAuthorById: jest
    .fn()
    .mockImplementation((id: string) => Promise.resolve(undefined)),
  updateAuthor: jest
    .fn()
    .mockImplementation((authorId: string, author: Author) =>
      Promise.resolve(author)
    ),
  findAllAuthors: jest.fn().mockImplementation(() => Promise.resolve([])),
};
