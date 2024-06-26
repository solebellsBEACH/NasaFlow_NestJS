### Comandos Migration

```bash
yarn typeorm migration:generate src/database/migrations/CreateUsersTable -d src/database/data-source.ts
```

### Passos para Rodar um Banco de Dados PostgreSQL no Docker

#### 1. Puxar a Imagem do PostgreSQL

Primeiro, baixe a imagem do PostgreSQL do Docker Hub:

```bash
docker pull postgres
```

#### 2. Rodar um Container PostgreSQL

Em seguida, execute um container com a imagem do PostgreSQL. No comando abaixo, substitua `mysecretpassword` por uma senha de sua escolha.

```bash
docker run --name meu_postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

Explicação dos parâmetros:

- `--name meu_postgres`: Dá um nome ao container.
- `-e POSTGRES_PASSWORD=mysecretpassword`: Define a senha do usuário `postgres`.
- `-d`: Roda o container em segundo plano (detached mode).
- `-p 5432:5432`: Mapeia a porta 5432 do host para a porta 5432 do container.
- `postgres`: Nome da imagem Docker.

#### 3. Verificar se o Container está Rodando

Para verificar se o container está rodando corretamente, use o comando:

```bash
docker ps
```

Você deve ver o container `meu_postgres` listado.

#### 4. Conectar ao Banco de Dados PostgreSQL

Agora você pode conectar ao banco de dados PostgreSQL usando uma ferramenta de cliente, como `psql`, ou um cliente gráfico, como o DBeaver, PgAdmin, etc.

##### Usando `psql`

Se você tiver o `psql` instalado no seu sistema, você pode se conectar ao PostgreSQL executando o comando:

```bash
psql -h localhost -p 5432 -U postgres
```

Será solicitado que você insira a senha (`mysecretpassword`).

##### Usando Docker para Conectar ao Container

Você também pode conectar ao container em execução diretamente usando o Docker:

```bash
docker exec -it meu_postgres psql -U postgres
```

Este comando irá iniciar uma sessão interativa do `psql` dentro do container.

#### 5. Parar e Remover o Container

Para parar o container:

```bash
docker stop meu_postgres
```

Para remover o container:

```bash
docker rm meu_postgres
```
