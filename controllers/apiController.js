const apiService = require("../services/apiService");
module.exports.healthCheck = (req, res) => {
    return apiService.healthCheck(req, res);
};
module.exports.currentUser = (req, res) => {
    return apiService.currentUser(req, res);
};
module.exports.register = (req, res) => {
    return apiService.register(req, res);
};
module.exports.login = (req, res) => {
    return apiService.login(req, res);
};
module.exports.logout = (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
};
