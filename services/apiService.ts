export {};
const keys = require("../config");
const mongoose = require("mongoose");
const User = mongoose.model('users');
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator")
const { logger } = require("../utils/logUtils")
const { NotificationType } = require("../constants/notification");
const { HttpStatusCode } = require("../constants/http");

const passwordSchema = new passwordValidator()

passwordSchema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(2).has().not().spaces()

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

module.exports.register = async (req, res) => {
    const { email, password: plainTextPassword, displayName } = req.body

    if (!plainTextPassword) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Password Required",
            message: "Please enter a password",
            type: NotificationType.ERROR,
        })
    }

    if (!passwordSchema.validate(plainTextPassword)) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Password Too Weak",
            message: "Password must be between 8-100 upper & lowercase characters, 2 digits, and no spaces",
            type: NotificationType.ERROR,
        })
    }

    const hashedPassword = bcrypt.hashSync(plainTextPassword, BCRYPT_SALT_ROUNDS)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(HttpStatusCode.FORBIDDEN).send({
            status: HttpStatusCode.FORBIDDEN,
            title: "Email Already Exists",
            message: "Please choose a different email address, or login instead.",
            type: NotificationType.ERROR,
        })
    }

    try {
        const user = await new User({
            email,
            hashedPassword: hashedPassword,
        }).save()

        res.send({
            status: HttpStatusCode.OK,
            title: "Account Created",
            message: "Please verify your account to complete registration.",
            type: NotificationType.SUCCESS,
        })
        logger.info(`New User Registration: ${user?.email}`)

    } catch (e) {
        logger.error("Error registering user:", e)
        return res.status(500).send({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            title: "Error Registering User",
            message: "Please try again, and contact support if this issue persists",
            type: NotificationType.ERROR,
        })
    }
}

module.exports.confirmEmail = async (req, res) => {
    const { email, token: emailConfirmationToken } = req.query

    if (!email || !emailConfirmationToken) {
        return res.status(400).send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Error Resetting Password",
            message: "An error occurred when trying to reset your password. Please try again later.",
            type: NotificationType.ERROR,
        })
    }

    try {
        const user = await User.findOne({ email, emailConfirmationToken })

        if (!user) {
            return res.status(404).send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Not Found",
                message: "User was not found. Please contact support.",
                type: NotificationType.ERROR,
            })
        }

        if (user.accountRegistered) {
            return res.status(400).send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Already Confirmed",
                message: "This account is already confirmed. Please login instead.",
                type: NotificationType.ERROR,
            })
        }

        await user.update({ accountRegistered: true, emailConfirmationToken: null })

        return res.send({
            status: HttpStatusCode.OK,
            title: "Email Confirmed Successfully",
            message: "Your email address has been successfully confirmed.",
            type: NotificationType.SUCCESS,
        })
    } catch (e) {
        logger.error("Error confirming email for:", email)
        return res.send({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            title: `Error confirming email`,
            message: "Please contact support",
            type: NotificationType.ERROR,
        })
    }
}

module.exports.resetPassword = async (req, res) => {
    const { email, password: plainTextPassword, token: passwordResetToken } = req.body

    if (!email || !plainTextPassword || !passwordResetToken) {
        return res.status(400).send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Error Resetting Password",
            message: "An error occurred when trying to reset your password. Please try again later.",
            type: NotificationType.ERROR,
        })
    }

    if (!passwordSchema.validate(plainTextPassword)) {
        return res.send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Password Too Weak",
            message: "Password must be between 8-100 upper & lowercase characters, 2 digits, and no spaces",
            type: NotificationType.ERROR,
        })
    }

    try {
        const user = await User.findOne({ email, passwordResetToken })

        if (!user) {
            return res.status(400).send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Not Found",
                message: "User was not found. Please contact support.",
                type: NotificationType.ERROR,
            })
        }

        if (!user.accountRegistered) {
            return res.status(400).send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Not Registered",
                message: "Please confirm your account before resetting your password.",
                type: NotificationType.ERROR,
            })
        }

        const hashedPassword = await bcrypt.hash(plainTextPassword, BCRYPT_SALT_ROUNDS)
        await user.update({ hashedPassword, passwordResetToken: null })

        return res.send({
            status: HttpStatusCode.OK,
            title: "Password Reset Successfully",
            message: "Your password has been successfully reset.",
            type: NotificationType.SUCCESS,
        })
    } catch (e) {
        logger.error("Error resetting password for:", email)
        return res.send({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            title: `Error resetting password`,
            message: "Please contact support",
            type: NotificationType.ERROR,
        })
    }
}
