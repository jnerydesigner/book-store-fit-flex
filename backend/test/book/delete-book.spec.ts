import { CreateBook } from "@application/use-cases/book/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { DeleteBook } from "@application/use-cases/book/delete-book.use-case";
import { FindByIdUseCase } from "@application/use-cases/book/find-by-id.use-case";

describe("Delete Book", () => {
  let bookRepository: BookRepositoryInMemory;
  let deleteBook: DeleteBook;
  let findById: FindByIdUseCase;
  let createBook: CreateBook;
  beforeEach(() => {
    bookRepository = new BookRepositoryInMemory();
    deleteBook = new DeleteBook(bookRepository);
    findById = new FindByIdUseCase(bookRepository);
    createBook = new CreateBook(bookRepository);
  });

  it("should delete book by id", async () => {
    const bookInput = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      releaseDate: "1937-09-21",
      description:
        "The Hobbit é um livro de fantasia escrito por J.R.R. Tolkien. Publicado pela primeira vez em 1937, ele é um precursor da trilogia O Senhor dos Anéis.",
    };

    const responseCreate = await createBook.execute(bookInput);

    let book = await findById.execute(responseCreate.id);

    expect(book.title).toBe(bookInput.title);

    const deleteSpy = jest.spyOn(bookRepository, "delete");

    await deleteBook.execute(responseCreate.id);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it("should delete throw an error if book not found", async () => {
    const nonExistentId = "non-id";
    await expect(deleteBook.execute(nonExistentId)).rejects.toThrow(
      "Book not found"
    );
  });
});
