const express = require('express');
// let {} = require('/models');
let { sequelize } = require('./lib/index.js');

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
