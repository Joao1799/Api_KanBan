import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createUser= async (request, response) => {
    try {
        const { senha, name, email } = request.body;
        const userExist = await prisma.User.findFirst({
            where: {
                OR: [
                    { email: email }
                ]
            }
        });
        if (userExist) {
            return response.status(422).json({ msg: 'Email já cadastrados' })
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        const newUser = await prisma.User.create({
            data: {
                email,
                senha: passwordHash,
                name,
            }
        });

        return response.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Erro ao criar usuário.", error });
    }
};

const loginUser= async (request, response) => {
    const { email, senha } = request.body

    if (!email) {
        return response.status(422).json({ msg: 'Email é obrigatorio' })
    }
    if (!senha) {
        return response.status(422).json({ msg: 'Senha é obrigatorio' })
    }

    const user = await prisma.User.findFirst({
        where: {
            OR: [
                { email: email } 
            ]
        }
    });
    if (!user) {
        return response.status(404).json({ msg: 'Usuario nao encontrado' })
    }

    const checkSenha = await bcrypt.compare(senha, user.senha)
    if (!checkSenha) {
        return response.status(422).json({ msg: 'Senha invalida!' })
    }


    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: '1h' }   // expirar o token após 1 hora
        );

        console.log(user);
        return response.status(200).json({ msg: 'Usuário autenticado',user,token });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro ao gerar o token!' });
    }
}

const getUserInfos = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.User.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }
        const { senha, ...userWithoutPassword } = user;

        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar o usuário!' });
    }
};

const getAllUsers= async (request, response) => {
    try {
        const users = await prisma.User.findMany({
            include: {
                atendimentos: true, 
            },
        });
        // tentando desestruturar senha diretamente da array users, mas users é um array de objetos
        // const { senha, ...userWithoutPassword } = users;

        //precisa mapear os usuários e remover o campo senha de cada objeto individualmente:
        const usersWithoutPassword = users.map(({ senha, ...rest }) => rest);
        response.status(200).json(usersWithoutPassword);
    } catch (error) {
        response.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

const updateUser= async (request, response) => {
    try {
        await prisma.User.update({
            where: {
                id: request.params.id
            },
            data: {
                name: request.body.ownerName,
                email: request.body.email,
                senha: request.body.senha
            }
        })
        response.status(201).json({msg: "Usuário editado com sucesso!", data})
    } catch (error) {
        response.status(500).json({ error: 'Erro ao editar usuário' });
    }
}

const deleteUser= async (request, response) => {
    try {
        await prisma.User.delete({
            where: {
                id: request.params.id
            }
        })
        response.status(204).json({msg: "Usuário excluido com sucesso!"})
    } catch {
        response.status(500).json({ error: 'Erro ao excluir usuário' });
    }
}

export default {
    createUser,
    loginUser,
    getUserInfos,
    getAllUsers,
    updateUser,
    deleteUser,
};