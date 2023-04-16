//Menu items routes

import express from 'express';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import session from 'express-session';
import CookiePolicy from '../../policies/cookiepolicy';
import PrivacyPolicy from '../../policies/privacypolicy';
import TermsAndConditions from '../../policies/termsandconditions';
import { about_us } from './functions/about_us';
import { contacts } from './functions/contacts';
import { rules } from './functions/rules';
import policy_document from './functions/policy_document';

export const menu_items_routes = express.Router();

menu_items_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

menu_items_routes.get('/about_us', about_us);

menu_items_routes.get('/contacts', contacts);

menu_items_routes.get('/cookie_policy', policy_document);

menu_items_routes.get('/privacy_policy', policy_document);

menu_items_routes.get('/rules', rules);

menu_items_routes.get('/terms', policy_document);

