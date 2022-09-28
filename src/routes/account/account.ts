//Account operations routes

import express from 'express';
import { logged } from '../../middlewares/middlewares';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';

export const account_routes = express.Router();

account_routes.get("/profile/:username", logged, (req,res)=>{
    let username: string = req.params.username;
    let current_username: string = req.session['username'];
    if(username == current_username){
        return res.render('logged/profile', {
            bootstrap_css: "../"+Paths.BOOTSTRAP_CSS, bootstrap_js: "../"+Paths.BOOTSTRAP_JS,
            container: Constants.CONTAINER, jquery_js: "../"+Paths.JQUERY_JS, jquery_ui_css: "../"+Paths.JQUERY_UI_CSS, 
            jquery_ui_js: "../"+Paths.JQUERY_UI_JS, username: username
        });
    }//if(username == current_username){
});