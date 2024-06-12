import { CreateBook } from "@application/use-cases/book/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

describe("Create Book", () => {
  let bookRepository: BookRepositoryInMemory;
  let createBook: CreateBook;
  beforeEach(() => {
    bookRepository = new BookRepositoryInMemory();
    createBook = new CreateBook(bookRepository);
  });
  it("should create a book", async () => {
    const bookInput = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
    };

    const responseCreate = await createBook.execute(bookInput);

    const response = await bookRepository.findOneById(responseCreate.id);

    expect(response.authorId).toBe(bookInput.author);
    expect(response.title).toBe(bookInput.title);
  });

  it("should not create a book with the same title", async () => {
    const bookInput1 = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
    };

    await createBook.execute(bookInput1);

    const bookInput2 = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
    };

    await expect(createBook.execute(bookInput2)).rejects.toThrow(
      "Book already exists"
    );
  });
});
