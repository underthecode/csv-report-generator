const models = require('../models/index');

const convertCSV = (formDataString, callback) => {
  const csvData = models.generateCSV(formDataString);
  callback(null, csvData);
};

module.exports = {
  convertCSV
};
