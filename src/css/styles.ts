//CSS files requests for frontend
import express from "express";
import path from "path";
export const styles_router = express.Router();

styles_router.get('/jquery_ui_css',(req,res) => {
    const jquery_ui_css: string = path.join('node_modules','jquery-ui-dist','jquery-ui.min.css');
    console.log(jquery_ui_css);
    res.sendFile(jquery_ui_css,{root: path.join(__dirname,'../','../')});
});

