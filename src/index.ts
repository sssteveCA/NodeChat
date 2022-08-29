
import express from 'express';
import fs from 'fs';
import mustache from 'mustache';
import mustacheExpress from 'mustache-express';
import { StaticPaths } from './modules/static_paths';
import { styles_router } from './routes/css/styles';
import { scripts_router } from './routes/js/scripts';
import { authentication_routes } from './routes/authentication/authentication';
import { Paths } from './paths';
import { Constants } from './constants';
const app = express();

app.use('/css2',styles_router);
app.use('/',authentication_routes);

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
        container: Constants.CONTAINER
    });
});

app.listen(Constants.PORT,Constants.HOSTNAME,()=>{
    console.log(`Server in esecuzione su ${Constants.MAIN_URL}`);
});