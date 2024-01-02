const bodyParser = require('body-parser');
const logger = require('../helpers/logger');
const bodyParserMiddleware = bodyParser.json({ limit: '10mb' });

// Middleware to handle errors in the body parser
const bodyParserErrorHnadlerMiddleware = (err, req, res, next) => {
    if (err) {
        logger.error("error general")
        res.status(500).json({"message": "invalid json format. Please check the documentation"})
        logger.error(err)
      } else {
        next()
      };
};

module.exports = { bodyParserMiddleware, bodyParserErrorHnadlerMiddleware };