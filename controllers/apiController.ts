const apiService = require("../services/apiService")
const {NotificationType} = require("../constants");
const {HttpStatusCode} = require("../constants");

module.exports.healthCheck = (req, res) => {
    return apiService.healthCheck(req, res);
}

module.exports.currentUser = (req, res) => {
    return apiService.currentUser(req, res);
};

module.exports.register = (req, res) => {
    return apiService.register(req, res);
}

module.exports.login = (req, res) => {
    if (req.user) {
        console.log('here')
        return res.status(200).send(req.user);
    } else {
        return res.status(401).send({
            status: HttpStatusCode.UNAUTHORIZED,
            title: "Login Failed",
            message: "The username / password combination was unsuccessful",
            type: NotificationType.ERROR
        })
    }
}

module.exports.confirmEmail = (req, res) => {
    return apiService.confirmEmail(req, res)
}

module.exports.resetPassword = (req, res) => {
    return apiService.resetPassword(req, res)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
}
