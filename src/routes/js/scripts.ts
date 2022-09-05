
//JS files request for frontend
import express from 'express';
import path from 'path';
import { Paths } from '../../paths';

export const scripts_router = express.Router();

scripts_router.get('/jquery_js',(req,res)=>{
    const jquery_js: string = path.join('node_modules','jquery','dist','jquery.min.js');
    res.sendFile(jquery_js,{root: Paths.ROOTPATH+'/../'});
});

scripts_router.get('/jquery_ui_js',(req,res)=>{
    const jquery_ui_js: string = path.join('node_modules','jquery-ui-dist','jquery-ui.min.js');
    res.sendFile(jquery_ui_js,{root: Paths.ROOTPATH+'/../'});
});