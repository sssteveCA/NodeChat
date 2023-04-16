
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
app.engine('mustache', mustacheExpress(Paths.ROOTPATH+'/views/partials','.mustache')); //Partials directory
//app.engine('mustache', mustacheExpress(Paths.ROOTPATH+'/views/logged','.mustache')); //Logged views directory
app.set('view engine','mustache');
app.set('views', Paths.ROOTPATH+'/views');
app.use(express.static(StaticPaths.PUBLIC_PATH));
app.get('/',async (req: Request, res: Response)=>{
    let index = ''
    let links_list: object[] = []
    let scripts_list: object[] = []
    let partial_data: object = {}
    if(req.session){
        index = path.resolve(__dirname,'dist/views/index_logged.mustache')
        links_list = [
            {rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS},
            {rel: 'stylesheet', href: Paths.JQUERY_UI_CSS},
            {rel: 'stylesheet', href: 'css/logged/index_logged.css'},
            {rel: 'stylesheet', href: 'css/logged/menu_logged.css'},
            {rel: 'stylesheet', href: 'css/footer.css'},
        ]
        scripts_list = [
            {src: Paths.BOOTSTRAP_JS},
            {src: Paths.JQUERY_JS},
            {src: Paths.JQUERY_UI_JS},
            {type: 'module', src: 'js/menu.js'},
            {type: 'module', src: 'js/logged/index_logged.js'},
            {src: 'js/footer.js'},
        ],
        partial_data = {token_key: req.session['token_key'], username: req.session['username']}
    }
    else{
        index = path.resolve(__dirname,'dist/views/partials/index.mustache')
        links_list = [
            { rel: 'stylesheet', href: Paths.BOOTSTRAP_CSS },
            { rel: 'stylesheet', href: 'css/index.css' },
            { rel: 'stylesheet', href: 'css/menu.css' },
            { rel: 'stylesheet', href: 'css/footer.css' },
        ]
        scripts_list = [
            {src: Paths.BOOTSTRAP_JS},
            {src: Paths.JQUERY_JS},
            {type: 'module', src: 'js/menu.js'},
            {src: 'js/footer.js'},
        ]
    }
    let content = await fs.readFile(index, {encoding: 'utf-8'})
    content = mustache.render(content,partial_data)
    const data = {
        session: req.session,
        title: "NodeChat",
        links: {
            list: links_list,
            link: () => { return `<link rel="${(<any>this).rel}" href="${(<any>this).href}">`; }
        },
        scripts: {
            list: scripts_list,
            script: () => {
                const type = ('type' in (<any>this)) ? (<any>this).type : "";
                return `<script type="${type}" src="${(<any>this).src}"></script>`;
            }
        },
        content : content
    };
    return res.render('layout',data)
});

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