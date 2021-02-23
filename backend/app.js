const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const drawRouter = require('./routes/draws');
const lastPriceRouter = require('./routes/lastPrice');
const payoutsRouter = require('./routes/payouts');
const btcDataRouter = require('./routes/btcData');

// constants
const rootRoute = '/api';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index route
app.use('/', indexRouter);

// Auth route
app.use(`${rootRoute}/auth`, authRouter);

// Users route
app.use(`${rootRoute}/users`, usersRouter);

// Users route
app.use(`${rootRoute}/user`, userRouter);

// Draws route
app.use(`${rootRoute}/draws`, drawRouter);

// Last BTC price route
app.use(`${rootRoute}/lastPrice`, lastPriceRouter);

// BTC data
app.use(`${rootRoute}/btcData`, btcDataRouter);

// Summary amout of payouts
app.use(`${rootRoute}/allPayouts`, payoutsRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
