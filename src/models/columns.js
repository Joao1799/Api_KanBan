import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createColumns = async (request, response) => {
    try {
        const { name, boardId } = request.body; 
        if (!name || !boardId) {
            return response.status(400).json({ msg: 'Nome e boardId são obrigatórios' });
        }
        const boardExist = await prisma.Board.findUnique({
            where: { id: boardId }
        });
        if (!boardExist) {
            return response.status(404).json({ msg: 'Board não encontrado' });
        }
        const newList = await prisma.List.create({
            data: {
                name,
                boardId 
            }
        });
        console.log(newList);
        return response.status(201).json(newList);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao criar a lista' });
    }
};

const getColumns = async (request, response) => {
    try {
        const { boardId } = request.params;

        const board = await prisma.Board.findUnique({
            where: { id: boardId }
        });

        if (!board) {
            return response.status(404).json({ msg: 'Board não encontrado' });
        }

        const lists = await prisma.List.findMany({
            where: { boardId }
        });

        return response.status(200).json(lists);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao listar as listas' });
    }
};

const updateColumns = async (request, response) => {
    try {
        const { id } = request.params; 
        const { name } = request.body;
        if (!name) {
            return response.status(400).json({ msg: 'Nome é obrigatório para editar' });
        }
        const list = await prisma.List.findUnique({
            where: { id }
        });
        if (!list) {
            return response.status(404).json({ msg: 'Lista não encontrada' });
        }
        const updatedList = await prisma.List.update({
            where: { id },
            data: { name }
        });
        return response.status(200).json(updatedList);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao editar a lista' });
    }
};

const deleteColumns = async (request, response) => {
    try {
        const { id } = request.params;
        const list = await prisma.List.findUnique({
            where: { id }
        });
        if (!list) {
            return response.status(404).json({ msg: 'Lista não encontrada' });
        }
        await prisma.List.delete({
            where: { id }
        });
        return response.status(200).json({ msg: 'Lista deletada com sucesso' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao deletar a lista' });
    }
};

export default {
    createColumns,
    getColumns,
    updateColumns,
    deleteColumns
};
