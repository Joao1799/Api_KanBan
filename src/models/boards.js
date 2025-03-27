import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBoards = async (req, res) => {
    try {
      const { userId, name, tipo } = req.body;
      const newBoard = await prisma.board.create({
        data: {
          name,
          tipo,
          users: {
            connect: { id: userId },
          },
        },
      });
  
      return res.status(201).json(newBoard);
    } catch (error) {
      console.error("Erro ao criar board:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  export const getBoards = async (req, res) => {
    try {
      const { userId } = req.query; 
      const boards = await prisma.board.findMany({
        where: userId ? { users: { some: { id: userId } } } : {}, 
      });
  
      return res.status(200).json(boards);
    } catch (error) {
      console.error("Erro ao buscar boards:", error);
      return res.status(500).json({ error: "Erro ao listar os boards" });
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
