const models = require('../models/models');

const convertCSV = (formDataString, callback) => {
  const csvData = models.generateCSV(formDataString);
  callback(null, csvData);
};

module.exports = {
  convertCSV
};
