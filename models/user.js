const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
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
        return /^((http|https):\/\/(www\.)?([\w\W]{1,})\.([a-zA-z]{2,10})([\w\W]{1,})?(#)?)$/.test(v);
      },
      message: 'Неправильный URL!', // когда validator вернёт false, будет использовано это сообщение
    },
  },
});

module.exports = mongoose.model('user', userSchema);
