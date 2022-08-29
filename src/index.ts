
import express from 'express';
import fs from 'fs';
import mustache from 'mustache';
import mustacheExpress from 'mustache-express';
import { StaticPaths } from './modules/static_paths';
import { styles_router } from './routes/css/styles';
import { authentication_routes } from './routes/authentication/authentication';
import { Paths } from './paths';
const app = express();
const PORT: number = 3000;

app.use('/css2',styles_router);
app.use('/',authentication_routes);

app.engine('mustache',mustacheExpress());
app.engine('mustache', mustacheExpress(Paths.ROOTPATH+'/views/partials','.mustache')); //Partials directory
app.set('view engine','mustache');
app.set('views', Paths.ROOTPATH+'/views');
//app.use(express.static(StaticPaths.public_path));
app.use('/css',express.static(StaticPaths.PUBLIC_PATH_CSS));
app.use('/js',express.static(StaticPaths.PUBLIC_PATH_JS));

app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(PORT,()=>{
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});