
import express from 'express';
import mustacheExpress from 'mustache-express';
import { StaticPaths } from './modules/static_paths';
import { styles_router } from './css/styles';
import { Paths } from './paths';
const app = express();
const PORT: number = 3000;

app.use('/css2',styles_router);

app.engine('mustache',mustacheExpress());
app.set('view engine','mustache');
app.set('views', __dirname+'/views');
//app.use(express.static(StaticPaths.public_path));
app.use('/css',express.static(StaticPaths.PUBLIC_PATH_CSS));

app.get('/',(req,res)=>{
    res.render('index',{
        jquery_ui_css: Paths.JQUERY_UI_CSS,
        subscribe: Paths.SUBSCRIBE
    });
});

app.get('/subscribe',(req,res)=>{

});

app.listen(PORT,()=>{
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});