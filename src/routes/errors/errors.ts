
import express from 'express';
import session from 'express-session';
import not_found from './functions/not_found';
import server_error from './functions/server_error';

export const errors_router = express.Router();

errors_router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

errors_router.get('/not_found',not_found);

errors_router.get('/server_error', server_error);