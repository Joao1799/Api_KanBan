import express from 'express';
import controllerUser from '../models/user.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const router = express.Router();

router.post('/registerUsers', controllerUser.createUser) 
router.post('/login/users', controllerUser.loginUser) 
router.get('/user/:id',verifyToken, controllerUser.getUserInfos);
router.get('/users', controllerUser.getAllUsers)
router.put('/users/:id', controllerUser.updateUser)
router.delete('/users/:id', controllerUser.deleteUser)

export default router;
