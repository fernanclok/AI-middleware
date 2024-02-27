const Bull = require('bull');
const axios = require('axios');
const redisClient = require('../redis/redisClient');
require('dotenv').config();


// define the queue
const aiQueue = new Bull('aiQueue', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// define the process
aiQueue.process(async (job, done) => {
    try {
        const { reqData, uniqueId } = job.data;

        // send the request to the AI
        const result = await axios.post(process.env.ai, reqData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.t
            }
        });

        // save the result in a variable
        const processedData = {
            model: job.data.reqData.model,
            prompt: job.data.reqData.prompt,
            result: result.data.response.replace(/[\n+]/g, ' ').trim(),  // remove the \n and \r from the result
            timestamp: new Date().toISOString(),
            uniqueId
        };

        //store the result in redis
        await redisClient.set(uniqueId, JSON.stringify(processedData));

        done(null, processedData);
    } catch (error) {
        done(error);
    }
});

module.exports = { aiQueue, redisClient };