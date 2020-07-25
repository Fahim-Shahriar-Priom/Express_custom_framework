
'user strict';
const config = require('config');
const mongoose = require('mongoose');
const logger = require('../../../helper/logger');

var options = 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    //reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 100, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0

};

const DBOptions = {
   url: config.get('MONGO.URL'),
};

mongoose.connect( DBOptions.url,options).then(() => {
        console.log("Successfully connected to the database");    
        logger.info("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });;

exports.mongoConncection = mongoose;
