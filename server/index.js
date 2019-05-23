const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.send('CSV Report Generator is served.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`CSV Report Generator is listening on ${PORT}`);
});
