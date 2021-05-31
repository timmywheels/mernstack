export {}
const emailController = require("../controllers/emailController")

module.exports = app => {
    app.post("/api/emails/confirm-email", emailController.sendEmailConfirmation)
    app.get("/api/emails/confirm-email", emailController.validateEmailConfirmation)
    app.post("/api/emails/reset-password", emailController.sendPasswordReset)
    app.get("/api/emails/reset-password", emailController.validatePasswordReset)
}
