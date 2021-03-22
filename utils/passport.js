const keys = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user?.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(name = 'local', strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        const plainTextPassword = password;
        const existingUser = User.findOne({email: username}, (err, user) => {
            const passwordMatch = bcrypt.compareSync(plainTextPassword, user?.hashedPassword);
            if (err) {
                console.log(`Authentication Error: ${user.email} - ${err}`)
                return done(err);
            }
            if (!passwordMatch) {
                console.log(`Incorrect Password: ${user.email}`)
                return done(null, false, {message: "Incorrect password"});
            }
            if (!user) {
                console.log(`Account Not Found: ${user.email}`)
                return done(null, false, {message: "Account not found"});
            }
            return done(null, user);
        });
    }
));