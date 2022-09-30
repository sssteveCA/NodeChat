
import express from 'express';
import { loggedApi } from '../middlewares/middlewares_api';

export const account_routes_api = express.Router();

account_routes_api.post('/profile/search', loggedApi, (req,res)=>{
    let query: string = req.body.query as string;
    if(query && query != ""){

    }//if(query && query != ""){
    else{
        return res.status(400).json({done: false, msg: "Digita un termine di ricerca per continuare"});
    }
});