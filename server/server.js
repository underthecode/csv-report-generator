const express = require('express');
const index = require('./index');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, '../client')));

app.post('/convert', (req, res) => {
  // console.log('REQ BODY', req.body.json);
  const formDataString = JSON.parse(req.body.json);
  console.log(formDataString);
  index.controller.convertCSV(formDataString, (err, csvData) => {
    if (err) {
      throw err;
    } else {
      const file = path.join(__dirname, '../client/json.txt');
      fs.writeFile(file, csvData, err => {
        if (err) {
          throw err;
        } else {
          console.log('JSON has been saved!');
        }
      });
      res.send();
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CSV Report Generator is listening on ${PORT}`);
});
