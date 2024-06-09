import { authorRepositoryMock } from "./author-repository.mock";
import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { FindAllAuthors } from "@application/use-cases/author/find-all-authors.use-case";
import { FindAuthorById } from "@application/use-cases/author/find-author-by-id.use-case";

describe("Find All Authors", () => {
  let createAuthor: CreateAuthor;
  let findAuthorById: FindAuthorById;
  let findAllAuthors: FindAllAuthors;

  beforeEach(() => {
    jest.clearAllMocks();
    createAuthor = new CreateAuthor(authorRepositoryMock);
    findAuthorById = new FindAuthorById(authorRepositoryMock);
    findAllAuthors = new FindAllAuthors(authorRepositoryMock);
  });
  it("should return all authors", async () => {
    const authorInputOne = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    const authorInputTwo = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    (authorRepositoryMock.create as jest.Mock).mockResolvedValueOnce(
      authorInputOne
    );
    (authorRepositoryMock.create as jest.Mock).mockResolvedValueOnce(
      authorInputTwo
    );
    (authorRepositoryMock.findAllAuthors as jest.Mock).mockResolvedValueOnce([
      authorInputOne,
      authorInputTwo,
    ]);

    await createAuthor.execute(authorInputOne);
    await createAuthor.execute(authorInputTwo);

    const responseAll = await findAllAuthors.execute();

    expect(responseAll).toHaveLength(2);
    expect(responseAll[0].name).toBe(authorInputOne.name);
    expect(responseAll[1].name).toBe(authorInputTwo.name);
  });
});
