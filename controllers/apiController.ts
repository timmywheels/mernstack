const apiService = require("../services/apiService")

module.exports.healthCheck = (req: any, res: any) => {
    return apiService.healthCheck(req, res);
}

module.exports.currentUser = (req: any, res: any) => {
    return apiService.currentUser(req, res);
};

module.exports.register = (req: any, res: any) => {
    return apiService.register(req, res);
}

module.exports.login = (req: any, res: any) => {
    return apiService.login(req, res);
}

module.exports.logout = (req: any, res: any) => {
    req.logout();
    req.session = null;
    res.redirect('/');
}