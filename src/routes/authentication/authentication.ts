//Authentiction routes (login,subscribe,account verify,password recovery)

import express from 'express';
import { guest } from '../middlewares/middlewares';
import { login_validator, subscribe_validator, verify_credentials } from './authentication_m';
import session from 'express-session';
import verify_code from './functions/verify_code';
import { login_get, login_post, logout } from './functions/login';
import { subscribe_get, subscribe_post } from './functions/subscribe';
import verify from './functions/verify';

export const authentication_routes = express.Router();

authentication_routes.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

authentication_routes.get('/login', guest, login_get);

authentication_routes.get('/logout', logout);

authentication_routes.get('/subscribe', guest, subscribe_get);

authentication_routes.get('/verify', guest, verify);

authentication_routes.get('/verify/:code', guest, verify_code);

authentication_routes.post('/login', [guest, login_validator, verify_credentials], login_post);

authentication_routes.post('/newAccount',[guest,subscribe_validator],subscribe_post);