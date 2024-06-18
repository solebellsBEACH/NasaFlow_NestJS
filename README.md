# NasaFlow_NestJS

NasaFlow_NestJS é uma aplicação construída utilizando o framework NestJS que permite aos usuários se autenticarem, gerenciar seu perfil, visualizar informações sobre asteroides e ler notícias relacionadas ao espaço.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Modelos de Banco de Dados](#modelos-de-banco-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints](#endpoints)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/SeuUsuario/NasaFlow_NestJS.git
cd NasaFlow_NestJS
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
DATABASE_URL=postgres://user:password@localhost:5432/nasaflow
JWT_SECRET=your_secret_key
```

Ajuste as variáveis conforme necessário para o seu ambiente de desenvolvimento.

## Execução

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`.

## Modelos de Banco de Dados

### User

- `id`: UUID
- `username`: string
- `password`: string
- `email`: string
- `profilePicture`: string
- `createdAt`: Date
- `updatedAt`: Date

### Asteroid

- `id`: UUID
- `name`: string
- `size`: number
- `velocity`: number
- `distanceFromEarth`: number
- `discoveredAt`: Date

### News

- `id`: UUID
- `title`: string
- `content`: text
- `imageUrl`: string
- `publishedAt`: Date
- `userId`: UUID (FK)

## Estrutura do Projeto

```plaintext
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── dto/
│       └── create-auth.dto.ts
├── users/
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── entities/
│   │   └── user.entity.ts
│   └── dto/
│       └── create-user.dto.ts
├── asteroids/
│   ├── asteroids.controller.ts
│   ├── asteroids.module.ts
│   ├── asteroids.service.ts
│   ├── entities/
│   │   └── asteroid.entity.ts
│   └── dto/
│       └── create-asteroid.dto.ts
├── news/
│   ├── news.controller.ts
│   ├── news.module.ts
│   ├── news.service.ts
│   ├── entities/
│   │   └── news.entity.ts
│   └── dto/
│       └── create-news.dto.ts
├── app.module.ts
├── main.ts
└── common/
    ├── guards/
    │   └── jwt-auth.guard.ts
    └── filters/
        └── http-exception.filter.ts
```

## Endpoints

### Autenticação

- **POST** `/auth/login` - Login do usuário
- **POST** `/auth/register` - Registro de um novo usuário

### Usuários

- **GET** `/users/profile` - Obter perfil do usuário autenticado
- **PATCH** `/users/profile` - Atualizar perfil do usuário

### Asteroides

- **GET** `/asteroids` - Listar todos os asteroides
- **GET** `/asteroids/:id` - Obter detalhes de um asteroide

### Notícias

- **GET** `/news` - Listar todas as notícias
- **GET** `/news/:id` - Obter detalhes de uma notícia
- **POST** `/news` - Criar uma nova notícia

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport](http://www.passportjs.org/) (JWT)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar um problema.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
