import { CreateBook } from "@application/use-cases/book/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";
import { FindById } from "@application/use-cases/book/find-by-id.use-case";

describe("Find Book By Id", () => {
  let bookRepository: BookRepositoryInMemory;
  let findById: FindById;
  let createBook: CreateBook;
  beforeEach(() => {
    bookRepository = new BookRepositoryInMemory();
    findById = new FindById(bookRepository);
    createBook = new CreateBook(bookRepository);
  });

  it("should find book by id", async () => {
    const book = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      releaseDate: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
    };

    const responseCreate = await createBook.execute(book);

    const response = await findById.execute(responseCreate.id);

    expect(response.author).toBe(book.author);
  });

  it("Should be not find and rejects call error not found book", async () => {
    const idNotFound = "768e33d1-bbc4-4b49-841e-0453b9e6a757";

    expect(bookRepository.findOneById(idNotFound)).rejects.toThrow(
      "Book not found"
    );
  });
});
