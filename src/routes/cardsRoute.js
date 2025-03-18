import express from 'express';
const router = express.Router();
import controllerCard from '../models/cards.js';

router.post('/createCard', controllerCard.createCard);
router.get('/lists/:listId/cards', controllerCard.getCards);
router.put('/cards/:id', controllerCard.updateCard);
router.post('/cards/:id', controllerCard.deleteCard);

export default router;