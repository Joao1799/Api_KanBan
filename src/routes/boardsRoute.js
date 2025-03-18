import express from 'express';
const router = express.Router();
import controllerBoard from '../models/boards.js';

router.post('/createBoard', controllerBoard.createBoards);
router.get('/listBoard', controllerBoard.getBoards);
router.put('/editBoard/:id', controllerBoard.updateBoard);
router.post('/deleteBoard/:id', controllerBoard.deleteBoard);

export default router;