export {}
const keys = require("../config")
const mongoose = require("mongoose")
const User = mongoose.model("users")
const { logger } = require("../utils/logUtils");
const { NotificationType } = require("../constants/notification")
const { HttpStatusCode } = require("../constants/http")
const bcrypt = require("bcrypt")
const sendgrid = require("@sendgrid/mail")
const fetch = require("node-fetch")

sendgrid.setApiKey(keys.SENDGRID.API_KEY)

const BCRYPT_SALT_ROUNDS = 10

module.exports.sendEmailConfirmation = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Email Required",
            message: "Please enter an email.",
            type: NotificationType.ERROR,
        })
    }

    const userIsAlreadyRegistered = await User.findOne({ email, accountRegistered: true })
    if (userIsAlreadyRegistered) {
        return res.send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "User Already Registered",
            message: "Please login instead",
            type: NotificationType.ERROR,
        })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.send({
            status: HttpStatusCode.NOT_FOUND,
            title: "User Does Not Exist",
            message: "User not found in our system, please register.",
            type: NotificationType.ERROR,
        })
    }

    const emailConfirmationToken = await bcrypt.hash(email, BCRYPT_SALT_ROUNDS)
    const emailConfirmationUrl = `${keys.APPLICATION.URL}/api/emails/confirm-email?email=${email}&token=${emailConfirmationToken}`

    try {
        await user.update({ emailConfirmationToken })

        const msg = {
            to: email,
            from: keys.SENDGRID.SENDER_EMAIL,
            reply_to: keys.SENDGRID.SENDER_EMAIL,
            subject: `Confirm Email | MernStack`,
            template_id: keys.SENDGRID.EMAIL_CONFIRMATION_TEMPLATE_ID,
            dynamic_template_data: {
                data: {
                    email,
                    url: emailConfirmationUrl,
                },
            },
        }

        const emailMessage = await sendgrid.send(msg)
        return res.send({
            status: HttpStatusCode.OK,
            title: `Email confirmation sent`,
            message: "Please check your email to confirm",
            type: NotificationType.SUCCESS,
        })
    } catch (e) {
        logger.error("Error sending email:", e)
        return res.send({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            title: `Error sending email confirmation`,
            message: "Please contact support",
            type: NotificationType.ERROR,
        })
    }
}

module.exports.validateEmailConfirmation = async (req, res) => {
    const { email, token: emailConfirmationToken } = req.query

    if (!email || !emailConfirmationToken) {
        return res.status(400).send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Error Confirming Email",
            message: "An error occurred when trying to confirm your email. Please try again later.",
            type: NotificationType.ERROR,
        })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Not Found",
                message: "User was not found. Please contact support.",
                type: NotificationType.ERROR,
            })
        }

        if (user.emailConfirmationToken !== emailConfirmationToken) {
            return res.status(403).send({
                status: HttpStatusCode.FORBIDDEN,
                title: "Invalid Email Confirmation Token",
                message: "Please contact support.",
                type: NotificationType.ERROR,
            })
        }

        if (user.accountRegistered) {
            return res.status(403).send({
                status: HttpStatusCode.FORBIDDEN,
                title: "User Already Registered",
                message: "User is already confirmed. Please login to continue.",
                type: NotificationType.ERROR,
            })
        }

        await user.update({ accountRegistered: true, emailConfirmationToken: null })

        return res.status(200).redirect(`/login?email=${email}&token=${emailConfirmationToken}`)
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

module.exports.sendPasswordReset = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Email Required",
            message: "Please enter an email.",
            type: NotificationType.ERROR,
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Not Found",
                message: "Please register for an account instead",
                type: NotificationType.ERROR,
            })
        }

        if (!user.accountRegistered) {
            return res.send({
                status: HttpStatusCode.FORBIDDEN,
                title: "User Account Not Confirmed",
                message: "Please confirm your account before resetting your password",
                type: NotificationType.ERROR,
            })
        }

        const passwordResetToken = await bcrypt.hash(email, BCRYPT_SALT_ROUNDS)
        const resetPasswordUrl = `${keys.APPLICATION.URL}/api/emails/reset-password?email=${email}&token=${passwordResetToken}`

        await user.update({ passwordResetToken })

        const msg = {
            to: email,
            from: keys.SENDGRID.SENDER_EMAIL,
            reply_to: keys.SENDGRID.SENDER_EMAIL,
            subject: `Reset Password | MernStack`,
            template_id: keys.SENDGRID.PASSWORD_RESET_TEMPLATE_ID,
            dynamic_template_data: {
                data: {
                    email,
                    url: resetPasswordUrl,
                },
            },
        }

        const emailMessage = await sendgrid.send(msg)
        return res.send({
            status: HttpStatusCode.OK,
            title: `Password reset email sent`,
            message: "Please check your email to reset your password",
            type: NotificationType.SUCCESS,
        })
    } catch (e) {
        logger.error("Error sending email:", e)
        return res.send({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            title: `Error sending password reset email`,
            message: "Please contact support",
            type: NotificationType.ERROR,
        })
    }
}

module.exports.validatePasswordReset = async (req, res) => {
    const { email, token: passwordResetToken } = req.query
    if (!email || !passwordResetToken) {
        return res.status(400).send({
            status: HttpStatusCode.BAD_REQUEST,
            title: "Error Resetting Password",
            message: "An error occurred when trying to reset your password. Please try again later.",
            type: NotificationType.ERROR,
        })
    }

    try {
        const user = await User.findOne({ email, passwordResetToken })
        if (!user) {
            return res.status(404).send({
                status: HttpStatusCode.NOT_FOUND,
                title: "User Not Found",
                message: "User was not found. Please contact support.",
                type: NotificationType.ERROR,
            })
        }
        if (!user.accountRegistered) {
            return res.send({
                status: HttpStatusCode.FORBIDDEN,
                title: "User Account Not Confirmed",
                message: "Please confirm your account before resetting your password",
                type: NotificationType.ERROR,
            })
        }
        return res.status(200).redirect(`/reset-password?email=${email}&token=${passwordResetToken}`)
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
