![Capa Github](https://github.com/jnerydesigner/book-store-fit-flex/blob/main/assets/capa-para-github.png)

<<<<<<< HEAD

# Book Store Fit


1. Primeira execução:

```
docker compose up --build

```

2. Front end:

```
http://localhost:3000

```

3. Um erro que não foi tratado, no delete de um livro, o mesmo ainda fica na página home, necessário o pressionamento da tecla F5, para restaurar o contexto, so aconteceu no docker.

4. Para execução sem o docker de tudo:
    * substitua o docker compose da raiz pelo que está abaixo:

```
version: "3.9"

version: "3.9"

services:
  # backend_node:
  #   container_name: backend_node
  #   build:
  #     context: ./backend
  #     dockerfile: Dockerfile.backend
  #   env_file:
  #     - ./backend/.env
  #   environment:
  #     SERVER_PORT: 3333
  #     DATABASE_URL: postgresql://fit:Fit1234@postgres-fit:5432/books
  #   ports:
  #     - "3333:3333"
  #   networks:
  #     - fit-network
  #   depends_on:
  #     - postgres-fit
  #   entrypoint:
  #     [
  #       "/bin/sh",
  #       "-c",
  #       "/usr/src/app/entrypoint.sh yarn start:prod & yarn prisma:seed && wait",
  #     ]

  # frontend_react:
  #   container_name: frontend_react
  #   env_file:
  #     - ./frontend/.env
  #   build:
  #     context: ./frontend
  #     dockerfile: Dockerfile
  #   ports:
  #     - "3000:3000"
  #   networks:
  #     - fit-network

  postgres-fit:
    image: postgres
    container_name: postgres_fit
    volumes:
      - postgres_fit:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: "fit"
      POSTGRES_PASSWORD: "Fit1234"
      POSTGRES_DB: "books"
    ports:
      - "5433:5432"
    networks:
      - fit-network

  pgadmin-compose-fit:
    container_name: pgadmin-compose-fit
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: "jander.webmaster@gmail.com"
      PGADMIN_DEFAULT_PASSWORD: "PgAdmin@2024"
    ports:
      - "16544:80"
    depends_on:
      - postgres-fit
    networks:
      - fit-network

volumes:
  postgres_fit:

networks:
  fit-network:
    driver: bridge




```

    * rode o comando de migrations e generates do prisma:

    ```
    yarn prisma:generate

    yarn prisma:migrate

    yarn prisma:seed

    ```


    * Após executada esses comandos, siga para a pasta "backend", rode o comando:

    ```
    yarn start:dev

    ```

     * Após executada esses comandos, siga para a pasta "frontend", rode o comando:

    ```
    yarn start

    ```

5. Rode os testes:
```
yarn test
```

6. Aplicação inspirada em TDD, puxando um pouco do Clean Code e alguns patterns do SOLID.


=======
https://github.com/jnerydesigner/book-store-fit-flex/blob/main/assets/capa-para-github.png

![Texto Alternativo](URL_da_Imagem)

>>>>>>> ccf654b1c9f8557057dafb6d8a9e544a31c529ae