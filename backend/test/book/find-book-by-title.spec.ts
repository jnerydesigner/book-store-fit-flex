import { CreateBook } from "@application/use-cases/book/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { FindBookByTitle } from "@application/use-cases/book/find-book-by-title.use-case";

describe("Find Book By Title", () => {
  let bookRepository: BookRepositoryInMemory;
  let createBook: CreateBook;
  let findBookByTitle: FindBookByTitle;
  beforeEach(() => {
    bookRepository = new BookRepositoryInMemory();
    createBook = new CreateBook(bookRepository);
    findBookByTitle = new FindBookByTitle(bookRepository);
  });

  it("should find book by title", async () => {
    const book = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
    };

    const responseCreate = await createBook.execute(book);

    const response = await findBookByTitle.execute(responseCreate.title);

    expect(response.title).toBe(book.title);
  });

  it("Should be not find and rejects call error not title book", async () => {
    const titleNotFound = "titleNotFound";

    expect(bookRepository.findByTitle(titleNotFound)).rejects.toThrow(
      "Book not found"
    );
  });
});
