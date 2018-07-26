'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');
//develop
var logPath = 'c:/logs';
//publish
//var logPath = 'c:/logs';

if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const error = winston.createLogger ({
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'errs.log'), 
            timestamp: tsFormat,           
            level: 'info'})
    ]
});

error.add(new winston.transports.Console({
    format: winston.format.simple()
}));

const log = winston.createLogger ({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(logPath, 'logs.log'), 
            timestamp: tsFormat,
            level: 'info'})
    ]
});   

module.exports = {
    error: error,
    log: log,
};
