const express = require('express');

const models = require("./db")
const indexRouter = require('./routes/index');
const {Sequelize, DataTypes} = require("sequelize");

const app = express()
const port = 3000

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
