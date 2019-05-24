const express = require('express');
const index = require('./index');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, '../client')));

app.post('/convert', (req, res) => {
  const formDataString = JSON.parse(req.body.json);
  console.log(typeof formDataString);
  index.controller.convertCSV(formDataString, (err, csvData) => {
    if (err) {
      throw err;
    } else {
      res.send(csvData);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CSV Report Generator is listening on ${PORT}`);
});
