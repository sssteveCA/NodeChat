
import express from 'express';
import session from 'express-session';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import not_found from './functions/not_found';

export const errors_router = express.Router();

errors_router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

errors_router.get('/not_found',not_found);

errors_router.get('/server_error',(req,res) => {
    let username: string = req.session[Constants.KEY_USERNAME] ? req.session[Constants.KEY_USERNAME] : null;
    let guest: boolean = !username ? true : false;
    return res.status(500).render('error/server_error',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER, guest: guest,jquery_js: Paths.JQUERY_JS, username: username
    });
});