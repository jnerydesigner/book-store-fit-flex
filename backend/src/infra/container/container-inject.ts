import { AuthorRepositoryPostgres } from "@infra/repository/author.repository";
import { BookRepositoryPostgres } from "@infra/repository/book.repository";
import { container } from "tsyringe";

container.register("AuthorRepository", {
  useClass: AuthorRepositoryPostgres,
});

container.register("BookRepository", {
  useClass: BookRepositoryPostgres,
});
