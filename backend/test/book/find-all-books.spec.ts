import { CreateBook } from "@application/use-cases/book/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { FindAllBooksUseCase } from "@application/use-cases/book/find-all.use-case";

describe("Find All Books", () => {
  let bookRepository: BookRepositoryInMemory;
  let findAll: FindAllBooksUseCase;
  let createBook: CreateBook;
  beforeEach(() => {
    bookRepository = new BookRepositoryInMemory();
    findAll = new FindAllBooksUseCase(bookRepository);
    createBook = new CreateBook(bookRepository);
  });

  it("should return all books", async () => {
    const book1 = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
    };

    const book2 = {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      releaseDate: "1937-09-21",
      description:
        "The Hobbit é um livro de fantasia escrito por J.R.R. Tolkien. Publicado pela primeira vez em 1937, ele é um precursor da trilogia O Senhor dos Anéis.",
    };
    const receivedBookOne = await createBook.execute(book1);
    const receivedBookTwo = await createBook.execute(book2);

    const books = await findAll.execute();

    expect(books).toHaveLength(2);
    expect(books).toEqual(
      expect.arrayContaining([receivedBookOne, receivedBookTwo])
    );
  });

  it("should return empty array", async () => {
    const books = await findAll.execute();

    expect(books).toHaveLength(0);
  });
});
