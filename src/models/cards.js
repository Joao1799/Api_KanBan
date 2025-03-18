import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createCard = async (request, response) => {
    try {
        const { title, description, type, listId } = request.body;
        if (!title || !listId || !type) {
            return response.status(400).json({ msg: 'Título, tipo e listId são obrigatórios' });
        }
        const listExist = await prisma.List.findUnique({
            where: { id: listId }
        });
        if (!listExist) {
            return response.status(404).json({ msg: 'Lista não encontrada' });
        }
        const newCard = await prisma.Card.create({
            data: {
                title,
                description,
                type,
                listId
            }
        });
        console.log(newCard);
        return response.status(201).json(newCard);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao criar o card' });
    }
};

const getCards = async (request, response) => {
    try {
        const { listId } = request.params;
        const listExist = await prisma.List.findUnique({
            where: { id: listId }
        });

        if (!listExist) {
            return response.status(404).json({ msg: 'Lista não encontrada' });
        }
        const cards = await prisma.Card.findMany({
            where: { listId }
        });

        return response.status(200).json(cards);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao listar os cards' });
    }
};

const updateCard = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, description, type } = request.body;
        if (!title || !type) {
            return response.status(400).json({ msg: 'Título e tipo são obrigatórios para editar' });
        }
        const cardExist = await prisma.Card.findUnique({
            where: { id }
        });
        if (!cardExist) {
            return response.status(404).json({ msg: 'Card não encontrado' });
        }
        const updatedCard = await prisma.Card.update({
            where: { id },
            data: {
                title,
                description,
                type
            }
        });

        return response.status(200).json(updatedCard);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao editar o card' });
    }
};

const deleteCard = async (request, response) => {
    try {
        const { id } = request.params;
        const cardExist = await prisma.Card.findUnique({
            where: { id }
        });
        if (!cardExist) {
            return response.status(404).json({ msg: 'Card não encontrado' });
        }
        await prisma.Card.delete({
            where: { id }
        });
        return response.status(200).json({ msg: 'Card deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao deletar o card' });
    }
};

export default {
	createCard,
    getCards,
    updateCard,
    deleteCard
};


