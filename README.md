![Capa Github](https://github.com/jnerydesigner/book-store-fit-flex/blob/main/assets/capa-para-github.png)

# Book Store Fit

* [ ] Primeira execução:

```
docker compose up --build

```

* [ ] Front end:

```
http://localhost:3000

```


Um erro que não foi tratado, no delete de um livro, o mesmo ainda fica na página home, necessário o pressionamento da tecla F5, para restaurar o contexto, so aconteceu no docker.

Na execução sem o docker geral, funciona muito bem.


Para execução sem o docker de tudo:

* substitua o docker compose da raiz pelo que está abaixo:

* Navegue ate a pasta /backend e rode o comando no terminal:

```
cp .env.example .env
```

* Apos ter copiado a pasta .env

1. Insira na variavel SERVER_PORT=3333
2. Insira na variavel DATABASE_URL=postgresql://fit:Fit1234@localhost:5433/books

* agora navegue ate a pasta /frontenv e rode o comando no terminal

```
cp .env.example .env
```

1. Insira a variavel REACT_APP_BACKEND=http://localhost:3333


* navegue até a pasta /backend rode o comando de migrations e generates do prisma:

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

5. Se quiser, navegue até a pasta /backend Rode os testes:

```
yarn test
```

6. Aplicação inspirada em TDD, puxando um pouco do Clean Code e alguns patterns do SOLID.


[Jander Linkedin](https://www.linkedin.com/in/jander-nery/ "Jander Linkedin")


>
> Comece onde você está, use o que você tem e faça o que você pode.
>
> Arthur Ashe
