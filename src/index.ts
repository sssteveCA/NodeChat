
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import mustache from 'mustache';
import mustacheExpress from 'mustache-express';
import { StaticPaths } from './modules/static_paths';
import { styles_router } from './routes/css/styles';
import { scripts_router } from './routes/js/scripts';
import { authentication_routes } from './routes/authentication/authentication';
import { menu_items_routes } from './routes/menu_items/menu_items';
import { email_routes } from './routes/email/email';
import { Paths } from './namespaces/paths';
import { Constants } from './namespaces/constants';
import { loadavg } from 'os';
import session from 'express-session';
import { account_routes } from './routes/account/account';

dotenv.config(); //Load .env file

const app = express();

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/css2',styles_router);
app.use('/js2',scripts_router);
app.use('/',authentication_routes);
app.use('/',menu_items_routes);
app.use('/',email_routes);
app.use('/',account_routes);

app.engine('mustache',mustacheExpress());
app.engine('mustache', mustacheExpress(Paths.ROOTPATH+'/views/partials','.mustache')); //Partials directory
//app.engine('mustache', mustacheExpress(Paths.ROOTPATH+'/views/logged','.mustache')); //Logged views directory
app.set('view engine','mustache');
app.set('views', Paths.ROOTPATH+'/views');
app.use(express.static(StaticPaths.PUBLIC_PATH));
app.get('/',(req,res)=>{
    /* console.log("session => ");
    console.log(req.session); */
    if(req.session['username'] && req.session['token_key']){
        return res.render('logged/index_logged',{
            bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS,
            container: Constants.CONTAINER, jquery_js: Paths.JQUERY_JS, jquery_ui_css: Paths.JQUERY_UI_CSS, 
            jquery_ui_js: Paths.JQUERY_UI_JS, username: req.session['username']
        });
    }
    return res.render('index',{
        bootstrap_css: Paths.BOOTSTRAP_CSS, bootstrap_js: Paths.BOOTSTRAP_JS,container: Constants.CONTAINER,
        jquery_js: Paths.JQUERY_JS
    });
});

app.listen(Constants.PORT,Constants.HOSTNAME,()=>{
    console.log(`Server in esecuzione su ${Constants.MAIN_URL}`);
});

app.all("*",(req,res)=>{
    res.redirect("/");
});

process.on('uncaughtException',(err) => {
    console.error("UncaughtException");
    console.error(err);
});