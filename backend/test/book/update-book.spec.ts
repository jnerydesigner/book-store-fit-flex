import { CreateBook } from "@application/use-cases/book/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { FindAllBooksUseCase } from "@application/use-cases/book/find-all.use-case";
import { FindByIdUseCase } from "@application/use-cases/book/find-by-id.use-case";
import { FindBookByTitle } from "@application/use-cases/book/find-book-by-title.use-case";
import { UpdateBookUseCase } from "@application/use-cases/book/update-book.use-case";

describe("Update Book", () => {
  let bookRepository: BookRepositoryInMemory;
  let findAll: FindAllBooksUseCase;
  let findById: FindByIdUseCase;
  let findBookByTitle: FindBookByTitle;
  let updateBook: UpdateBookUseCase;
  let createBook: CreateBook;
  beforeEach(() => {
    bookRepository = new BookRepositoryInMemory();
    findAll = new FindAllBooksUseCase(bookRepository);
    findById = new FindByIdUseCase(bookRepository);
    findBookByTitle = new FindBookByTitle(bookRepository);
    updateBook = new UpdateBookUseCase(bookRepository);
    createBook = new CreateBook(bookRepository);
  });

  it("should update book by id", async () => {
    const bookInput = {
      title: "The Lord Of The Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1937-09-21",
      description:
        "The Hobbit é um livro de fantasia escrito por J.R.R. Tolkien. Publicado pela primeira vez em 1937, ele é um precursor da trilogia O Senhor dos Anéis.",
    };

    const responseCreate = await createBook.execute(bookInput);

    const bookInputUpdate = {
      title: "Nineteen Eighty-Four (1984)",
      author: "George Orwell",
      releaseDate: "1949-01-01",
      description:
        "Nineteen Eighty-Four, muitas vezes publicado como 1984, é um romance distópico de ficção política e social escrita pelo autor inglês George Orwell. Publicado em 1949, é a obra mais conhecida do autor, sendo o seu último livro publicado em vida.",
      id: responseCreate.id,
    };

    const response = await updateBook.execute(
      responseCreate.id,
      bookInputUpdate
    );

    expect(response.title).toBe(bookInputUpdate.title);
    expect(response.author).toBe(bookInputUpdate.author);
    expect(response.releaseDate).toBe(bookInputUpdate.releaseDate);
    expect(response.description).toBe(bookInputUpdate.description);
  });

  it("should throw an error update book if book not found", async () => {
    const nonExistentId = "non-id";

    const bookInputUpdate = {
      title: "The Lord Of The Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1937-09-21",
      description:
        "The Hobbit é um livro de fantasia escrito por J.R.R. Tolkien. Publicado pela primeira vez em 1937, ele é um precursor da trilogia O Senhor dos Anéis.",
    };

    await expect(
      updateBook.execute(nonExistentId, bookInputUpdate)
    ).rejects.toThrow("Book not found");
  });
});
