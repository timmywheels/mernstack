export {};
const express = require("express")
const passport = require("passport")
const cookieSession = require("cookie-session")
const keys = require("./config")

const app = express()

require("./utils/test/database-init.test")
require("./utils/passport")

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.APPLICATION.COOKIE],
    })
)

app.use(passport.initialize())
app.use(passport.session())

require('./models/User');

require("./routes/apiRoutes")(app)
require("./routes/emailRoutes")(app)

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
    console.log(`Test server listening on port ${PORT}`)
})

module.exports = app;
