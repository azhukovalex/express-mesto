const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const deleteCard = (req, res) => {
  const id = req.params._id;
  Card.findByIdAndDelete(id)
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `Введены некорректные данные: ${err.name}` });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: `Нет пользователя с таким Id: ${err}` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `Введены некорректные данные: ${err}` });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
