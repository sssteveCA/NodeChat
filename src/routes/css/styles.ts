//CSS files requests for frontend
import express from "express";
import path from "path";
import { Paths } from "../../namespaces/paths";
export const styles_router = express.Router();

styles_router.get('/bootstrap_css', (req,res)=>{
    const bootstrap_css: string = path.join('node_modules','bootstrap','dist','css','bootstrap.min.css');
    res.sendFile(bootstrap_css, {root: Paths.SRCPATH+'../'});
});

styles_router.get('/jquery_ui_css',(req,res) => {
    const jquery_ui_css: string = path.join('node_modules','jquery-ui-dist','jquery-ui.min.css');
    //console.log(jquery_ui_css);
    res.sendFile(jquery_ui_css,{root: Paths.SRCPATH+'../'});
});



