"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }
    next();
};
