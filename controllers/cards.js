const path = require('path');
const getDataCards = require('../helpers/jsonReader.js');

const cardsDataPath = path.join(__dirname, '../data/cards.json');
const getCards = (req, res) => getDataCards(cardsDataPath)
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err));

module.exports = { getCards };
