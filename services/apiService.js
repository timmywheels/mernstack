const keys = require("../config");
const mongoose = require("mongoose");
const User = mongoose.model('users');
const bcrypt = require("bcrypt");
const { NotificationType } = require("../constants/notification");
const { HttpStatusCode } = require("../constants/http");

const BCRYPT_SALT_ROUNDS = 10;

module.exports.healthCheck = (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        status: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthCheck);
    } catch (e) {
        healthCheck.status = e;
        res.status(503).send(healthCheck);
    }
};

module.exports.currentUser = (req, res) => {
    return res.status(200).send(req.user);
}

module.exports.register = async (req, res, done) => {
    const { email, password: plainTextPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(plainTextPassword, BCRYPT_SALT_ROUNDS);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.send({
            status: HttpStatusCode.FORBIDDEN,
            title: 'Email Already Exists',
            message: 'Please choose a different email address, or login instead.',
            type: NotificationType.ERROR
        });
        return done(null, existingUser);
    }

    const user = await new User({
        email,
        hashedPassword: hashedPassword
    }).save();

    res.send({
        status: HttpStatusCode.OK,
        title: 'Account Created',
        message: 'Please verify your account to complete registration.',
        type: NotificationType.SUCCESS
    });
}