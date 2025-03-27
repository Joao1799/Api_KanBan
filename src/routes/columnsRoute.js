import express from 'express';
const router = express.Router();
import controllerColumns from '../models/columns.js';

router.post('/createColumns', controllerColumns.createColumns);
router.get('/boards/:boardId/lists', controllerColumns.getColumns);
router.put('/editColumns/:id', controllerColumns.updateColumns);
router.delete('/deleteColumns/:id', controllerColumns.deleteColumns);

export default router;