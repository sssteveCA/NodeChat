
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
import { Paths } from './paths';
import { Constants } from './constants';
import { loadavg } from 'os';

dotenv.config(); //Load .env file

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/css2',styles_router);
app.use('/js2',scripts_router);
app.use('/',authentication_routes);
app.use('/',menu_items_routes);
app.use('/',email_routes);

app.engine('mustache',mustacheExpress());
app.engine('mustache', mustacheExpress(Paths.ROOTPATH+'/views/partials','.mustache')); //Partials directory
app.set('view engine','mustache');
app.set('views', Paths.ROOTPATH+'/views');
//app.use(express.static(StaticPaths.public_path));
app.use('/css',express.static(StaticPaths.PUBLIC_PATH_CSS));
app.use('/img', express.static(StaticPaths.PUBLIC_PATH_IMG));
app.use('/js',express.static(StaticPaths.PUBLIC_PATH_JS));

app.get('/',(req,res)=>{
    res.render('index',{
        container: Constants.CONTAINER,
        background: Constants.BACKGROUND
    });
});

app.listen(Constants.PORT,Constants.HOSTNAME,()=>{
    console.log(`Server in esecuzione su ${Constants.MAIN_URL}`);
});

process.on('uncaughtException',(err) => {
    console.error("UncaughtException");
    console.error(err);
});