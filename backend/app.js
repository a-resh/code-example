const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const drawRouter = require('./routes/draws');
const lastPriceRouter = require('./routes/lastPrice');
const payoutsRouter = require('./routes/payouts');
const btcDataRouter = require('./routes/btcData');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index route
app.use('/', indexRouter);

// Users route
app.use('/users', usersRouter);

// Users route
app.use('/user', userRouter);

// Draws route
app.use('/draws', drawRouter);

// Last BTC price route
app.use('/lastPrice', lastPriceRouter);

// BTC data
app.use('/btcData', btcDataRouter);

// Summary amout of payouts
app.use('/allPayouts', payoutsRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
