
import express from 'express';
import session from 'express-session';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';

export const errors_router = express.Router();

errors_router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

errors_router.get('/not_found',(req,res)=>{
    let username: string = req.session['username'] ? req.session['username'] : null;
    let guest: boolean = !username ? true : false;
    return res.status(404).render('error/not_found',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER, guest: guest,jquery_js: Paths.JQUERY_JS, username: username
    });
});