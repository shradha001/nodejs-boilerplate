'use strict';
const dotenv = require('dotenv');
dotenv.load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { errorHandler } = require('./middleware');
require('./database').getConnection();
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
routes(app);
app.use(errorHandler);

module.exports = app;
