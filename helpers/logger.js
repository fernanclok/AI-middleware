const winston = require('winston');

// Define the custom settings for each transport (file, console)
const myFormat = winston.format.printf((info) => {
    let msg = `${info.timestamp} ${info.level}: ${info.message}`;
    if (info.messageBody) {  
        msg += ' ' + JSON.stringify(info.messageBody);  
    }
    return msg;
});

// Create the logger instance that has to be exported
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.errors({stack: true}),
        myFormat
    ),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'logs/combined.log'})
    ]
});

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.errors({stack: true}),
            myFormat
        )
    }));
}

module.exports = logger;