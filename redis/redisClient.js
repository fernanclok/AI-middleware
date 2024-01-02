const Redis = require('ioredis');

// start a new redis client
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    enableReadyCheck: false,  
    maxRetriesPerRequest: null  
});

// handle errors 
redisClient.on('error', (err) => {
    console.log(`Error connecting to Redis: ${err}`);
});

module.exports = redisClient;