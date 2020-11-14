const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const controllers = require('../controllers/controllers');

router.post('/convert', (req, res) => {
  const formDataString = JSON.parse(req.body.json);
  controllers.convertCSV(formDataString, (err, csvData) => {
    if (err) {
      throw err;
    } else {
      const file = path.join(__dirname, '../../client/public/json.txt');
      fs.writeFile(file, csvData, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('JSON has been saved');
        }
      });
      res.send();
    }
  });
});

module.exports = router;
