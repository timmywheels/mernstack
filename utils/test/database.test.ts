export {};
const keys = require('../../config');
const mongoose = require('mongoose');
const { logger } = require("../logUtils")
const dbUri = keys.MONGO.URI

function databaseConnect() {
    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).catch(err => {
        return err
    });
    return mongoose.connection;
}

mongoose.connection.on("disconnected", () => {
    logger.warn("Mongoose disconnected")
})

const gracefulShutdown = (message, callback) => {
    mongoose.connection.close(() => {
        logger.info("Mongoose disconnected through " + message)
        callback()
    })
}

process.on("SIGINT", () => {
    gracefulShutdown("app termination", () => {
        process.exit(0)
    })
})

function databaseDisconnect() {
    return mongoose.disconnect();
}

require('../../models/User');

module.exports = { databaseConnect, databaseDisconnect };
