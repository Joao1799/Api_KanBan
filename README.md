# 🗂️ API_Kanban - Sistema de Gerenciamento de Tarefas

## 📌 Descrição

API desenvolvida para um trabalho universitário, destinada à gestão de tarefas no formato Kanban. A API segue os padrões RESTful e permite a gestão de quadros (**boards**), listas (**lists**), cartões (**cards**) e usuários (**users**). Conta com autenticação via **JWT**, criptografia de senha e utiliza o **MongoDB** como banco de dados, com **Prisma ORM** para manipulação dos dados.

## 🚀 Tecnologias Utilizadas

- 🌐 **Node.js** - Plataforma para desenvolvimento backend.
- 🚀 **Express** - Framework para criação de APIs.
- 🔐 **JWT (JsonWebToken)** - Autenticação e segurança.
- 🔒 **bcrypt.js** - Criptografia de senhas.
- 🛢 **MongoDB** - Banco de dados NoSQL.
- 🔄 **Prisma ORM** - Manipulação de banco de dados.
- 📡 **RESTful API** - Arquitetura para comunicação entre sistemas.
- 📜 **dotenv** - Gerenciamento de variáveis de ambiente.

## 📥 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/Joao1799/Api_KanBan.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd API_Kanban
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e defina os valores necessários, como a string de conexão do MongoDB e a chave secreta do JWT:
   ```env
   DATABASE_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/kanban
   JWT_SECRET=minhaChaveSecreta
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

## 📂 Estrutura do Projeto

```
📁 API_Kanban/
├── 📂 prisma/              
│   ├── 📝 schema.prisma
├── 📂 src/
│   ├── 📂 models/          # Lógica de manipulação de dados
│   ├── 📂 routes/          # Definição de rotas
│   ├── 📂 middleware/      # Autenticação e segurança
│   ├── 📄 server.js        # Configuração principal do servidor
├── 📄 .env                 # Variáveis de ambiente
├── 📄 package.json         # Dependências e scripts
├── 📄 README.md            # Documentação do projeto
```

## ✅ Funcionalidades

- 🏢 **CRUD Completo para Quadros, Listas e Cartões**
- 🔑 **Autenticação de Usuário via JWT**
- 🔒 **Criptografia de Senha com bcrypt.js**
- 📊 **Integração com MongoDB via Prisma ORM**
- 🔄 **API RESTful para manipulação dos dados**

## 🔧 Endpoints Principais

### 🔹 Usuários
- `POST /registerUsers` - Cria um novo usuário.
- `POST /login/users` - Autentica um usuário e retorna um token JWT.
- `POST /user/:id` - Retorna as informações do usuário.
- `POST /users` - Lista todos os usuários.
- `POST /users/:id` - Atualiza as informações de um usuário.
- `DELETE /users/:id` - Exclui um quadro.


### 🔹 Boards
- `GET /listBoard` - Lista todos os quadros.
- `POST /createBoard` - Cria um novo quadro.
- `PUT /editBoard/:id` - Atualiza um quadro.
- `DELETE /deleteBoard/:id` - Exclui um quadro.

### 🔹 Lists
- `GET /boards/:boardId/lists` - Lista todas os listas.
- `POST /createColumns` - Cria uma nova lista.
- `PUT /editColumns/:id'` - Atualiza uma lista.
- `DELETE /deleteColumns/:id` - Exclui uma lista.

### 🔹 Cards
- `GET /lists/:listId/cards` - Lista todos os quadros.
- `POST /createCard` - Cria um novo quadro.
- `PUT /cards/:id` - Atualiza um quadro.
- `DELETE /cards/:id` - Exclui um quadro.

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.

