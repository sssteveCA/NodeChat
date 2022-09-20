//Account operations routes

import express from 'express';
import { logged } from '../../middlewares/middlewares';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';

export const account_routes = express.Router();

account_routes.get("/profile", logged, (req,res)=>{
    return res.render('logged/profile', {
        container: Constants.CONTAINER, jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, 
        jquery_ui_js: Paths.JQUERY_UI_JS
    });
});