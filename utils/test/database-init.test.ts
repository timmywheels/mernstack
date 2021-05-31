export {}
const mongoose = require("mongoose")
const { databaseConnect, databaseDisconnect } = require("./database.test.ts")
const { logger } = require("../logUtils")
const User = mongoose.model('users');

before(async () => {
    databaseConnect()
        .on("error", (error) => {
            logger.warn("Mongoose error:", error)
            return error
        })
        .on("disconnected", () => logger.warn("Mongoose disconnected"))
        .on("exit", (code) => logger.warn("About to exit with code:", code))
})

after(async () => {

    await User.deleteMany({})

    databaseDisconnect()
        .then(() => {})
        .catch((err) => err)
})

