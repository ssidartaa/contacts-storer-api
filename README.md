# Sobre o projeto

Projeto desenvolvido com a finalidade de armazenar contatos. <a href="">Front-End</a> do projeto.

## Como instalar e rodar a aplicação

1- Crie o banco de dados no PostgreSQL

2- Clone o repositório em sua máquina

3- Instale todas as dependências necessárias usando o comando `yarn` ou `yarn install`

4- Crie o arquivo .env na raiz do projeto e configure com as suas variáveis de ambiente usando o exemplo do .env.example

5- Utilize o comando `yarn typeorm migration:run -d src/data-source.ts` para criar as tabaleas no banco de dados

6- Para rodar o projeto utilize o comando `yarn dev`

- Para rodar os testes utilze o comando `yarn test`

- Para rodar o docker lembrar de colocar no .env a variavél HOST para `db`

## Tecnologias usadas no projeto:

- JAVASCRIPT
- TYPESCRIPT
- NODE.JS
- EXPRESS
- TYPEORM
- BCRYPT
- CLASS-TRANSFORMER
- CROSS-ENV
- DOTENV
- EXPRESS-ASYNC-ERRORS
- JEST
- JSONWEBTOKEN
- PG
- REFLECT-METADATA
- SQLITE3
- SUPERTEST
- TS-JEST
- TS-NODE-DEV
- YUP

# Documentação

## Endpoints

<a href="#-login-">Login</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="#-clientes-">Clientes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="#-contatos-">Contatos</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

#

<h2 align ='center'> Login </h2>

`POST /login - REQUISIÇÃO`

- Essa rota não requer autenticação

```JSON
{
    "email": "sid@mail.com",
    "password": "1234",
}
```

`POST /login - RESPOSTA - STATUS 200`

```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZHJhZGVAZ21haWwuY29tIiwiaWF0IjoxNjc1ODcxMjk1LCJleHAiOjE2NzU5NTc2OTUsInN1YiI6ImI4MDg4M2Q0LThlZTUtNDUwMS1iMTk2LTc1MDk1MmEyMWU0NyJ9.0s6ywow2xN6XMDQCLUtMJdSDYeXnfo2WGvY5wF8dQT4"
}
```

#

<h2 align ='center'> Clientes </h2>

`POST /clients -  REQUISIÇÃO`

- Essa rota não requer autenticação

```JSON
{
    "fullName": "Sidarta Kauã Oliveira Souza",
    "email": "sid@mail.com",
    "password": "1234",
    "phoneNumber": "+55 (68) 99609-0471"
}
```

`POST /clients -  RESPOSTA - STATUS 201`

```JSON
{
	"id": "a87dcea8-901e-4f46-b14f-019662eac70a",
	"fullName": "Sidarta Kauã Oliveira Souza",
	"email": "sid@mail.com",
	"phoneNumber": "+55 (68) 99609-0471",
	"createdAt": "2023-02-08T19:55:16.396Z",
	"updatedAt": "2023-02-08T19:55:16.396Z"
	"contacts": []
}
```

#

`GET /clients - REQUISIÇÃO`

- Essa rota não requer autenticação
- Não requer corpo para fazer a requisição

`GET /clients - RESPOSTA - STATUS 200`

```JSON
[
    {
        "id": "a87dcea8-901e-4f46-b14f-019662eac70a",
        "fullName": "Sidarta Kauã Oliveira Souza",
        "email": "sid@mail.com",
        "phoneNumber": "+55 (68) 99609-0471",
        "createdAt": "2023-02-08T19:55:16.396Z",
        "updatedAt": "2023-02-08T19:55:16.396Z",
        "contacts": []
    }
]
```

#

`GET /clients/owner - REQUISIÇÃO`

- Essa rota requer autenticação
- Não requer corpo para fazer a requisição

`GET /clients/owner - RESPOSTA - STATUS 200`

```JSON
{
	"id": "a87dcea8-901e-4f46-b14f-019662eac70a",
	"fullName": "Sidarta Kauã Oliveira Souza",
	"email": "sid@mail.com",
	"phoneNumber": "+55 (68) 99609-0471",
	"createdAt": "2023-02-06T11:19:02.543Z",
	"updatedAt": "2023-02-06T11:19:02.543Z",
	"contacts": []
}
```

#

`POST /clients/pdf - REQUISIÇÃO`

- Essa rota requer autenticação
- Não requer corpo para fazer a requisição

`POST /clients/pdf - RESPOSTA - STATUS 201`

- Essa rota retorna um pdf com todas as informações do cliente e seus contatos

#

#### Nas rotas seguintes não será necessário o id do cliente na requisição, pois só é possivel deletar e atualizar o próprio usuário

`PATCH /clients - REQUISIÇÃO`

- Essa rota requer autenticação

```JSON
{
	"fullName": "Kenzinho Oliveira Souza",
	"password": "123"
}
```

`PATCH /clients - RESPOSTA - STATUS 200`

```JSON
{
	"id": "a87dcea8-901e-4f46-b14f-019662eac70a",
	"fullName": "Kenzinho Oliveira Souza",
	"email": "sid@gmail.com",
	"phoneNumber": "+55 (68) 99609-0471",
	"createdAt": "2023-02-03T07:40:35.300Z",
	"updatedAt": "2023-02-03T08:08:23.242Z",
	"contacts": []
}
```

#

`DELETE /clients - REQUISIÇÃO`

- Essa rota requer autenticação
- Não requer corpo para fazer a requisição

`DELETE /clients - RESPOSTA - STATUS 204`

- Essa rota não contém corpo de resposta

#

<h2 align ='center'> Contatos </h2>

`POST /contacts - REQUISIÇÃO`

- Essa rota requer autenticação

```JSON
{
    "fullName": "Kenzinho Oliveira Santos",
	"email": "kenzinho@mail.com",
	"phoneNumber": "+12 (123) 12345-6789"
}
```

`POST /contacts - RESPOSTA - STATUS 201`

```JSON
{
	"id": "9ee34227-0e51-4d27-b3b6-3c15f5153261",
	"fullName": "Kenzinho Oliveira Santos",
	"email": "kenzinho@mail.com",
	"phoneNumber": "+12 (123) 12345-6789",
	"createdAt": "2023-02-08T18:30:11.661Z",
	"updatedAt": "2023-02-08T18:30:11.661Z"
}
```

#

`GET /contacts - REQUISIÇÃO`

- Não requer corpo para fazer a requisição
- Essa rota requer autenticação

`GET /contacts - RESPOSTA - STATUS 200`

```JSON
[
    {
        "id": "9ee34227-0e51-4d27-b3b6-3c15f5153261",
        "fullName": "Kenzinho Oliveira Santos",
        "email": "kenzinho@mail.com",
        "phoneNumber": "+12 (123) 12345-6789",
        "createdAt": "2023-02-08T18:30:11.661Z",
        "updatedAt": "2023-02-08T18:30:11.661Z",
        "ownerId": "a87dcea8-901e-4f46-b14f-019662eac70a"
    }
]
```

#

`GET /contacts/:id - REQUISIÇÃO`

- Não requer corpo para fazer a requisição
- Essa rota requer autenticação
- Essa rota requer o id do contato enviado por params

`GET /contacts/:id - RESPOSTA - STATUS 200`

```JSON
{
    "id": "9ee34227-0e51-4d27-b3b6-3c15f5153261",
    "fullName": "Kenzinho Oliveira Santos",
    "email": "kenzinho@mail.com",
    "phoneNumber": "+12 (123) 12345-6789",
    "createdAt": "2023-02-08T18:30:11.661Z",
    "updatedAt": "2023-02-08T18:30:11.661Z",
    "ownerId": "a87dcea8-901e-4f46-b14f-019662eac70a"
}
```

#

`PATCH /contacts/:id - REQUISIÇÃO`

- Essa rota requer autenticação
- Essa rota requer o id do contato enviado por params

```JSON
{
	"fullName": "Drey Oliveira Souza"
}
```

`PATCH /contacts/:id - RESPOSTA - STATUS 200`

```JSON
{
	"id": "9ee34227-0e51-4d27-b3b6-3c15f5153261",
	"fullName": "Drey Oliveira Souza",
	"email": "kenzinho@mail.com",
	"phoneNumber": "+12 (123) 12345-6789",
	"createdAt": "2023-02-08T18:30:11.661Z",
	"updatedAt": "2023-02-08T18:31:02.856Z"
}
```

#

`DELETE /contacts/:id - REQUISIÇÃO`

- Não requer corpo para fazer a requisição
- Essa rota requer autenticação
- Essa rota requer o id do contato enviado por params

`DELETE /contacts - RESPOSTA - STATUS 204`

- Essa rota não contém corpo de resposta

<p align ='center'> Copyright <a href="https://github.com/ssidartaa">Sidarta Oliveira</a> 2023 </p>
