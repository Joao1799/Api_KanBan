import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createBoards = async (request, response) => {
	try {
		const { name, tipo } = request.body;
        if (!name || !tipo) {
            return response.status(400).json({ msg: 'Nome e tipo são obrigatórios' });
        }
        const boardExist = await prisma.Board.findFirst({
            where: {
                OR: [
                    { name: name }
                ]
            }
        });
        if (boardExist) {
            return response.status(422).json({ msg: 'O nome do board já existe' });
        }
		const newBoard = await prisma.Board.create({
            data: {
                name,
                tipo
            }
        });
		console.log(newBoard);
		return response.status(201).json(newBoard);
	} catch (error) {
		response.status(500).json({ error: 'Erro ao criar usuários' });
	}
};

const getBoards = async (request, response) => {
    try {
        const boards = await prisma.Board.findMany();
        return response.status(200).json(boards);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao listar os boards' });
    }
};

const updateBoard = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, tipo } = request.body;
        if (!name || !tipo) {
            return response.status(400).json({ msg: 'Nome e tipo são obrigatórios para editar' });
        }
        const board = await prisma.Board.findUnique({
            where: { id }
        });
        if (!board) {
            return response.status(404).json({ msg: 'Board não encontrado' });
        }
        const updatedBoard = await prisma.Board.update({
            where: { id },
            data: { name, tipo }
        });
        return response.status(200).json(updatedBoard); 
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao editar o board' });
    }
};

const deleteBoard = async (request, response) => {
    try {
        const { id } = request.params;
        const board = await prisma.Board.findUnique({
            where: { id }
        });
        if (!board) {
            return response.status(404).json({ msg: 'Board não encontrado' });
        }
        await prisma.Board.delete({
            where: { id }
        });

        return response.status(200).json({ msg: 'Board deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao deletar o board' });
    }
};



export default {
	createBoards,
    getBoards,
    updateBoard,
    deleteBoard
};
