
import express from 'express';
import session from 'express-session';

export const errors_router = express.Router();

errors_router.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));

errors_router.get('/not_found',(req,res)=>{
    if(req.session['username'] && req.session['token_key']){

    }//if(req.session['username'] && req.session['token_key']){
    else{

    }
});