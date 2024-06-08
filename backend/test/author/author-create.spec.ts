import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { AuthorRepositoryInMemory } from "@infra/repository/author.repository";

describe("Author Create", () => {
  let authorRepository: any;
  let createAuthor: CreateAuthor;

  beforeEach(() => {
    authorRepository = new AuthorRepositoryInMemory();
    createAuthor = new CreateAuthor(authorRepository);
  });
  it("should create a new author", async () => {
    const authorInput = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    await createAuthor.execute(authorInput);

    expect(authorRepository.authors[0].name).toBe(authorInput.name);
    expect(authorRepository.authors[0].birthDate).toBe(authorInput.birthDate);
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
});
