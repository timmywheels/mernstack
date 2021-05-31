module.exports = {
    APPLICATION: {
        COOKIE: process.env.APPLICATION_COOKIE
    },
    MONGO: {
        URI: process.env.MONGO_URI
    },
    SENDGRID: {
        API_KEY: process.env.SENDGRID_API_KEY,
        SENDER_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
        EMAIL_CONFIRMATION_TEMPLATE_ID: process.env.SENDGRID_EMAIL_CONFIRMATION_TEMPLATE_ID,
        PASSWORD_RESET_TEMPLATE_ID: process.env.SENDGRID_PASSWORD_RESET_TEMPLATE_ID
    }
}
