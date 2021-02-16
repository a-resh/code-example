const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const drawRouter = require('./routes/draws');
const lastPriceRouter = require('./routes/lastPrice');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index route
app.use('/', indexRouter);

// User route
app.use('/users', userRouter);

// Draws route
app.use('/draws', drawRouter);

// Last BTC price route
app.use('/lastPrice', lastPriceRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
