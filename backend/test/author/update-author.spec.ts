import { CreateAuthor } from "@application/use-cases/author/create-author.use-case";
import { FindAuthorById } from "@application/use-cases/author/find-author-by-id.use-case";
import { UpdateAuthor } from "@application/use-cases/author/update-author.use-case";
import { AuthorRepositoryInMemory } from "@infra/repository/author.repository";

describe("Update Author", () => {
  let authorRepository: any;
  let createAuthor: CreateAuthor;
  let findAuthorById: FindAuthorById;
  let updateAuthor: UpdateAuthor;

  beforeEach(() => {
    authorRepository = new AuthorRepositoryInMemory();
    createAuthor = new CreateAuthor(authorRepository);
    findAuthorById = new FindAuthorById(authorRepository);
    updateAuthor = new UpdateAuthor(authorRepository);
  });
  it("should update author by id", async () => {
    const authorInputCreate = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    const response = await createAuthor.execute(authorInputCreate);

    const responseAuthor = await findAuthorById.execute(response.authorId);

    const authorInputUpdate = {
      id: responseAuthor.authorId,
      name: "H. G. Wells",
      birthDate: "1866-09-21",
    };

    const updateAuthorResponse = await updateAuthor.execute(
      response.authorId,
      authorInputUpdate
    );

    expect(updateAuthorResponse.name).toBe(authorInputUpdate.name);
  });

  it("should not update find author by id", async () => {
    const authorInputCreate = {
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };
    const res = await createAuthor.execute(authorInputCreate);

    const authorInput = {
      id: "id_not_valid",
      name: "J.R.R. Tolkien",
      birthDate: "1892-01-03",
    };

    await expect(
      updateAuthor.execute(authorInput.id, authorInput)
    ).rejects.toThrow("Author not found");
  });
});
