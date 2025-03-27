import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import userBoards from './src/routes/boardsRoute.js'; 
import userCards from './src/routes/cardsRoute.js'; 
import userColumns from './src/routes/columnsRoute.js'; 
import user from './src/routes/userRoute.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userBoards);
app.use('/api', userCards);
app.use('/api', userColumns);
app.use('/api', user);

// Board (Quadro) → Armazena informações do Kanban principal.
// List (Lista) → Colunas dentro de um quadro.
// Card (Cartão) → Tarefas dentro de uma lista.

const startServer = async () => {
    try{
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

startServer();
