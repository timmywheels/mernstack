const keys = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');
const { logger } = require("../utils/logUtils");

passport.serializeUser((user, done) => {
    done(null, user?.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    name = "local",
    strategy = new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const plainTextPassword = password
                const existingUser = await User.findOne({ email: username })

                if (!plainTextPassword || !existingUser) {
                    logger.info("Authentication Error: User not found ->", username)
                    return done(null, false)
                }

                const passwordMatch = bcrypt.compareSync(plainTextPassword, existingUser.hashedPassword)

                if (!passwordMatch) {
                    logger.info(`Incorrect Password: ${existingUser.email}`)
                    return done(null, false, { message: "Incorrect password" })
                }
                if (!existingUser) {
                    logger.info(`Account Not Found: ${existingUser.email}`)
                    return done(null, false, { message: "Account not found" })
                }
                return done(null, existingUser)
            } catch (e) {
                logger.info("Error logging in:", e)
                return done(e)
            }
        }
    )
)
