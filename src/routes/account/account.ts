//Account operations routes

import express from 'express';
import { MongoDbModelManagerInterface } from '../../classes/database/mongodbmodelmanager';
import { logged } from '../middlewares/middlewares';
import { Constants } from '../../namespaces/constants';
import { Paths } from '../../namespaces/paths';
import { Schemas} from '../../namespaces/schemas';
import {Account, AccountInterface} from '../../classes/database/models/account';

export const account_routes = express.Router();

account_routes.get("/profile/:username", logged, (req,res)=>{
    let username: string = req.params.username;
    let current_username: string = req.session['username'];
    let view_params: object = {
        bootstrap_css: "../"+Paths.BOOTSTRAP_CSS,
        bootstrap_js: "../"+Paths.BOOTSTRAP_JS,
        container: Constants.CONTAINER, jquery_js: "../"+Paths.JQUERY_JS, jquery_ui_css: "../"+Paths.JQUERY_UI_CSS, 
        jquery_ui_js: "../"+Paths.JQUERY_UI_JS, username: username
    };
    if(username == current_username){
        //Personal profile
        view_params["token_key"] = res.locals["tokenKey"];
        return res.render('logged/profile', view_params);
    }//if(username == current_username){
    else{
        //Other profiles
        let mmi_data: MongoDbModelManagerInterface = {
            collection_name: process.env.MONGODB_ACCOUNTS_COLLECTION as string,
            schema: Schemas.ACCOUNTS 
        };
        let ac_data: AccountInterface = {};
        let ac: Account = new Account(mmi_data,ac_data);
        ac.getAccount({username: username}).then(obj =>{
            if(obj['result'] != null){
                //Account found
                return res.render('logged/user_profile',view_params);
            }//if(obj['result'] != null){
            else{
                //Account not found
                return res.redirect('/not_found');
            }
        }).catch(err => {
            //Server error
            return res.redirect('/server_error');
        });
    }
});