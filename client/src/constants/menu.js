"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardDropdownMenu = exports.DashboardMenu = exports.DropdownMenu = exports.Menu = exports.Redirect = exports.MenuItem = void 0;
var MenuItem;
(function (MenuItem) {
    MenuItem["FEATURES"] = "Features";
    MenuItem["PRICING"] = "Pricing";
    MenuItem["DASHBOARD"] = "Dashboard";
    MenuItem["INBOX"] = "Inbox";
    MenuItem["FORMS"] = "Forms";
    MenuItem["DOCS"] = "Docs";
    MenuItem["PROFILE"] = "Profile";
    MenuItem["BILLING"] = "Billing";
    MenuItem["LOGOUT"] = "Logout";
})(MenuItem = exports.MenuItem || (exports.MenuItem = {}));
var Redirect;
(function (Redirect) {
    Redirect["HOME"] = "/";
    Redirect["FEATURES"] = "/features";
    Redirect["PRICING"] = "/pricing";
    Redirect["DASHBOARD"] = "/dashboard";
    Redirect["HOME_DOCS"] = "/docs";
    Redirect["INBOX"] = "/dashboard/inbox";
    Redirect["FORMS"] = "/dashboard/forms";
    Redirect["FORMS_NEW"] = "/dashboard/forms/new";
    Redirect["DOCS"] = "/dashboard/docs";
    Redirect["PROFILE"] = "/dashboard/profile";
    Redirect["BILLING"] = "/dashboard/billing";
    Redirect["LOGIN"] = "/login";
    Redirect["LOGOUT"] = "/auth/logout";
    Redirect["REGISTER"] = "/register";
    Redirect["CONFIRM_EMAIL"] = "/confirm-email";
    Redirect["CONFIRM_DEVICE"] = "/confirm-device";
})(Redirect = exports.Redirect || (exports.Redirect = {}));
exports.Menu = [
    { title: MenuItem.FEATURES, link: Redirect.FEATURES },
    { title: MenuItem.PRICING, link: Redirect.PRICING },
];
exports.DropdownMenu = [
    { title: MenuItem.DASHBOARD, link: Redirect.DASHBOARD },
    { title: MenuItem.BILLING, link: Redirect.BILLING },
    { title: MenuItem.LOGOUT }
];
exports.DashboardMenu = [
    { title: MenuItem.DASHBOARD, link: Redirect.DASHBOARD },
    { title: MenuItem.INBOX, link: Redirect.INBOX },
    { title: MenuItem.FORMS, link: Redirect.FORMS },
    { title: MenuItem.DOCS, link: Redirect.DOCS },
];
exports.DashboardDropdownMenu = [
    { title: MenuItem.PROFILE, link: Redirect.PROFILE },
    { title: MenuItem.BILLING, link: Redirect.BILLING },
    { title: MenuItem.LOGOUT }
];
