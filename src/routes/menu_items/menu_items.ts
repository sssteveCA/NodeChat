//Menu items routes

import express from 'express';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';

export const menu_items_routes = express.Router();

menu_items_routes.get('/about_us',(req,res)=>{
    res.render('about_us',{ container: Constants.CONTAINER });
});

menu_items_routes.get('/contacts',(req,res)=>{
    res.render('contacts',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS, container: Constants.CONTAINER,
        jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, jquery_ui_js: Paths.JQUERY_UI_JS
    });
});

menu_items_routes.get('/rules',(req,res)=>{
    res.render('rules',{ container: Constants.CONTAINER });
});

menu_items_routes.get('/terms',(req,res)=>{
    res.render('terms',{ container: Constants.CONTAINER });
});

