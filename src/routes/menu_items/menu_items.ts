//Menu items routes

import express from 'express';
import { Constants } from '../../constants';

export const menu_items_routes = express.Router();

menu_items_routes.get('/about_us',(req,res)=>{
    res.render('about_us',{
        container: Constants.CONTAINER
    })
});

menu_items_routes.get('/contacts',(req,res)=>{
    res.render('contacts',{
        container: Constants.CONTAINER
    });
});

menu_items_routes.get('/rules',(req,res)=>{
    res.render('rules',{
        container: Constants.CONTAINER
    });
});

menu_items_routes.get('/terms',(req,res)=>{
    res.render('terms',{
        container: Constants.CONTAINER
    });
});

