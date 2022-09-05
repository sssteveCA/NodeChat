
//Email routes
import express from 'express';

const email_routes = express.Router();

email_routes.post('/send_email',(req,res)=>{
    console.log(req.body);
});