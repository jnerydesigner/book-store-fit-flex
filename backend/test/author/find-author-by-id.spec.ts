import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { FindAuthorById } from "@application/use-cases/author/find-author-by-id.use-case";
import { AuthorRepositoryInMemory } from "@infra/repository/author.repository";

describe("Find Author", () => {
  let authorRepository: any;
  let createAuthor: CreateAuthor;
  let findAuthorById: FindAuthorById;

  beforeEach(() => {
    authorRepository = new AuthorRepositoryInMemory();
    createAuthor = new CreateAuthor(authorRepository);
    findAuthorById = new FindAuthorById(authorRepository);
  });
  it("should find author by id", async () => {
    const authorInput = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    const response = await createAuthor.execute(authorInput);

    const responseAuthor = await findAuthorById.execute(response.id);

    expect(responseAuthor.name).toBe(authorInput.name);
  });

  it("should not create an author with the same name", async () => {
    const authorInputOne = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    await createAuthor.execute(authorInputOne);
    const authorInputTwo = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    await expect(createAuthor.execute(authorInputTwo)).rejects.toThrow(
      "Author already exists"
    );
  });

  it("should not find author by id", async () => {
    const authorInput = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    await createAuthor.execute(authorInput);

    await expect(findAuthorById.execute("123")).rejects.toThrow(
      "Author not found"
    );
  });
});
