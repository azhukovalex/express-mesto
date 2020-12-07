const cardsRouter = require('express').Router();
const { getCards } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

module.exports = cardsRouter;
