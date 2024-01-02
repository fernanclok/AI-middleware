require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

const Server = require('./server');
const verifyToken = require('./middlewares/verifyToken');
const LOGFILE = '.logs/combined.log';
const logger = require('./helpers/logger');
const { bodyParserMiddleware, bodyParserErrorHnadlerMiddleware } = require('./middlewares/bodyParser');
const routes = require('./routes');
const PORT = process.env.PORT;

//create the logs folder if it doesn't exist
if (fs.existsSync(LOGFILE)) {
    fs.unlinkSync(LOGFILE);
}

//use cors
app.use(cors());

//create a write stream
const writeStream = {
    write: (message) => logger.info(message.trim())
}

//use morgan to log requests to the console
app.use(morgan('combined', { stream: writeStream }));

//use middlewares
app.use(verifyToken);
app.use(bodyParserMiddleware);
app.use(bodyParserErrorHnadlerMiddleware);

//use routes
app.use('/', routes);

//start the server
Server(app, PORT);