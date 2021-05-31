const apiController = require('../controllers/apiController');
const authenticated = require('../middlewares/authenticated');
const passport = require('passport');

const userAuthentication = passport.authenticate('local');

module.exports = app => {
    app.get('/api/health-check', apiController.healthCheck);
    app.get('/api/current-user', authenticated, apiController.currentUser);
    app.post('/api/user/login', userAuthentication, apiController.login);
    app.post('/api/user/register', apiController.register);
    app.post("/api/user/confirm-email", apiController.confirmEmail)
    app.post("/api/user/reset-password", apiController.resetPassword)
};
