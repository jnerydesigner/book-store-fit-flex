import { CreateBook } from "@application/create-book.use-case";
import { BookRepositoryInMemory } from "@infra/repository/book.repository";

describe("Create Book", () => {
  it("should create a book", async () => {
    const id = "e85826b8-f41f-41e9-bde8-97ac851906b3";

    const bookInput = {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      release_date: "1954-07-29",
      description:
        "The Lord of the Rings é uma trilogia de livros de alta fantasia escrita pelo autor britânico J.R.R. Tolkien. Lançado pela primeira vez em 1954, o livro segue a jornada épica de um grupo de personagens em sua missão para derrotar o mal que ameaça seu mundo.",
      id,
    };

    const bookRepository = new BookRepositoryInMemory();
    const createBook = new CreateBook(bookRepository);
    createBook.execute(bookInput);

    const response = await bookRepository.findOneById(
      "e85826b8-f41f-41e9-bde8-97ac851906b3"
    );

    expect(response.author).toBe(bookInput.author);
    expect(response.id).toBe(bookInput.id);
    expect(response.title).toBe(bookInput.title);
  });
});
