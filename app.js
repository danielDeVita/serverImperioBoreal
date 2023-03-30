const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/carts');
const orderRouter = require('./routes/orders');
const reviewRouter = require('./routes/reviews');
const mpRouter = require('./routes/mp')
const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
app.use('/reviews', reviewRouter); 
app.use('/mp', mpRouter);

module.exports = app;