const logger = require('../helpers/logger');
const { parsing } = require('../helpers/parsing');
const { aiQueue } = require('../queue/bull');
const { v4: uuidv4 } = require('uuid');

// Controller to send a request to the AI
const aiController = async (req, res) => {
    try {
        // Log the request body
        logger.info('=================')
        logger.info('JSON request body: ', {messageBody: req.body});
        const contentType = req.headers['content-type'];

        // Verify the content-type
        if(!contentType || contentType !== 'application/json') {
            throw { statuscode: 400, message: 'Content-type is not application/json' };
        }

        // Parse the request body
            req.body = parsing(req.body, res);

            logger.info("JSON parsed succesfully");
            logger.info("POST /ai", { messageBody: req.body });
            logger.info("JSON sended to AI");

        // Generate a unique id
        const uniqueId = uuidv4();

        //add a work to the queue
        aiQueue.add({ reqData: req.body, uniqueId });

        // Send the unique id to the client
        res.status(200).json({ message: uniqueId });
    } catch (error) {
        // If there is an error, send a message to the client
        logger.error(error);
        res.status(500).json({ "Message": "Something went wrong: " + error.message }).send()
    }
};

module.exports = aiController;