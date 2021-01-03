const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства avatar
        return /^(http[s]?:\/\/){0,1}[(w{3,3}\.)]?[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/g.test(v);
      },
      message: 'Неправильный URL!', // когда validator вернёт false, будет использовано это сообщение
    },
  },
});

module.exports = mongoose.model('user', userSchema);
