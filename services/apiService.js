const keys = require("../config");
const mongoose = require("mongoose");

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

module.exports.register = (req, res) => {
    return {};
}

module.exports.login = (req, res) => {
    return {};
}