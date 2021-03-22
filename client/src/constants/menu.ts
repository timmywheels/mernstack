import { IMenuItem } from '../types';

export enum MenuItem {
	FEATURES = 'Features',
	PRICING = 'Pricing',
	DASHBOARD = 'Dashboard',
	INBOX = 'Inbox',
	FORMS = 'Forms',
	DOCS = 'Docs',
	PROFILE = 'Profile',
	BILLING = 'Billing',
	LOGOUT = 'Logout'
}

export enum Redirect {
	HOME = '/',
	FEATURES = '/features',
	PRICING = '/pricing',
	DASHBOARD= '/dashboard',
	HOME_DOCS = '/docs',
	INBOX = '/dashboard/inbox',
	FORMS = '/dashboard/forms',
	FORMS_NEW = '/dashboard/forms/new',
	DOCS = '/dashboard/docs',
	PROFILE = '/dashboard/profile',
	BILLING = '/dashboard/billing',
	LOGIN = '/login',
	LOGOUT = '/auth/logout',
	REGISTER = '/register',
	CONFIRM_EMAIL = '/confirm-email',
	CONFIRM_DEVICE = '/confirm-device'
}

export const Menu: Array<IMenuItem> = [
	{ title: MenuItem.FEATURES, link: Redirect.FEATURES },
	{ title: MenuItem.PRICING, link: Redirect.PRICING },
];

export const DropdownMenu: Array<IMenuItem> = [
	{ title: MenuItem.DASHBOARD, link: Redirect.DASHBOARD},
	{ title: MenuItem.BILLING, link: Redirect.BILLING},
	{ title: MenuItem.LOGOUT}
];


export const DashboardMenu: Array<IMenuItem> = [
	{ title: MenuItem.DASHBOARD, link: Redirect.DASHBOARD },
	{ title: MenuItem.INBOX, link: Redirect.INBOX },
	{ title: MenuItem.FORMS, link: Redirect.FORMS },
];

export const DashboardDropdownMenu: Array<IMenuItem> = [
	{ title: MenuItem.PROFILE, link: Redirect.PROFILE},
	{ title: MenuItem.BILLING, link: Redirect.BILLING},
	{ title: MenuItem.LOGOUT}
];



