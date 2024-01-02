const redisClient = require('../redis/redisClient');

// Controller to get the result from the AI
const aiResultController = async (req, res) => {
    try {
        const { uniqueId } = req.params;

        // Get the result from redis
        const result = await redisClient.get(uniqueId);

        // if the result is null, the result is not ready yet
        if (!result) {
            return res.status(404).json({ message: 'Result is not ready yet' });
        // if the result is not null, send the result to the client    
        } else if (result) {
            return res.status(200).json(JSON.parse(result));
        // if there is an error, send a message to the client
        } else {
            return res.status(500).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        // If there is an error, send a message to the client
        res.status(500).json({ message: 'Something went wrong: ' + error.message });
    }
};

module.exports = aiResultController;