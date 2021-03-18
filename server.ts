export {};
const keys = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

require("./utils/database");
require("./utils/passport");

const db = mongoose.connection;

// configure express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure passport
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req: any, res: any) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`)
});