require('dotenv').config();
const apiToken = process.env.t;
const logger = require('../helpers/logger');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const authToken = req.header('Authorization');

    if(req.method === 'OPTIONS') {
        return res.status(200).send('OPTIONS');
    };

    if (!authToken || authToken !== apiToken) {
        logger.info('==========================');
        logger.info('Unauthorized', { messageBody: req.body })
        logger.error(error);
        return res.status(401).json({ message: "Unauthorized"});
    }

    next();
};

module.exports = verifyToken;