const emailService = require("../services/emailService")

module.exports.sendEmailConfirmation = (req, res) => {
    return emailService.sendEmailConfirmation(req, res)
}

module.exports.validateEmailConfirmation = (req, res) => {
    return emailService.validateEmailConfirmation(req, res)
}

module.exports.sendPasswordReset = (req, res) => {
    return emailService.sendPasswordReset(req, res)
}

module.exports.validatePasswordReset = (req, res) => {
    return emailService.validatePasswordReset(req, res)
}
