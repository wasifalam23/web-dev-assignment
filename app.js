const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const perosnRouter = require('./routes/personRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/people', perosnRouter);

app.use(globalErrorHandler);

module.exports = app;
