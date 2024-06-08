import { AuthorRepositoryPostgres } from "@infra/repository/author.repository";
import { container } from "tsyringe";

container.register("AuthorRepository", {
  useClass: AuthorRepositoryPostgres,
});
