const fsPromises = require('fs').promises;

const getFileData = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(err));

module.exports = getFileData;
