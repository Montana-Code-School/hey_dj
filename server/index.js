const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.db);
const path = require('path');

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(express.static('build'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../build')));

app.listen(config.port)