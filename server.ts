export {};
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require('cookie-session');
const keys = require('./config')

require("./utils/database");
require("./utils/passport");

const db = mongoose.connection;

// configure express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure sessions
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.APPLICATION.COOKIE],
    }),
);

// configure passport
app.use(passport.initialize());
app.use(passport.session());


// routes
require('./routes/apiRoutes')(app);
require('./routes/emailRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`)
});
