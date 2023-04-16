
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import mustache from 'mustache';
import mustacheExpress from 'mustache-express';
import listEndpoints from "express-list-endpoints";
import { StaticPaths } from './modules/static_paths';
import { styles_router } from './routes/css/styles';
import { scripts_router } from './routes/js/scripts';
import { authentication_routes } from './routes/authentication/authentication';
import { menu_items_routes } from './routes/menu_items/menu_items';
import { email_routes } from './routes/email/email';
import { Paths } from './namespaces/paths';
import { Constants } from './namespaces/constants';
import session from 'express-session';
import { account_routes } from './routes/account/account';
import { errors_router } from './routes/errors/errors';
import { account_routes_api } from './routes/api/account/account_api';
import index_route from './index_route';

dotenv.config(); //Load .env file

const app = express();

app.use(cookieParser());
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
app.use('/api',account_routes_api);
app.use('/',errors_router);

app.engine('mustache',mustacheExpress());
app.engine('mustache', mustacheExpress(Paths.SRCPATH+'/views/partials','.mustache')); //Partials directory
//app.engine('mustache', mustacheExpress(Paths.SRCPATH+'/views/logged','.mustache')); //Logged views directory
app.set('view engine','mustache');
app.set('views', Paths.SRCPATH+'/views');
app.use(express.static(StaticPaths.PUBLIC_PATH));
app.get('/', index_route);

app.listen(Constants.PORT,Constants.HOSTNAME,()=>{
    console.log(`Server in esecuzione su ${Constants.MAIN_URL}`);
    //console.log(app._router);
});

app.all("*",(req,res)=>{
    res.redirect("/not_found");
});

process.on('uncaughtException',(err) => {
    console.error("UncaughtException");
    console.error(err);
});

//console.log(listEndpoints(app));