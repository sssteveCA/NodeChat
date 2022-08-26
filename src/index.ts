
import express from 'express';
import mustacheExpress from 'mustache-express';
import { StaticPaths } from './modules/static_paths';
import { DepPaths } from './modules/dependencies_paths';
import path from 'path';
const app = express();
const PORT: number = 3000;

console.log(DepPaths.JQUERY_UI_CSS);

app.engine('mustache',mustacheExpress());
app.set('view engine','mustache');
app.set('views', __dirname+'/views');
//app.use(express.static(StaticPaths.public_path));
app.use('/css',express.static(StaticPaths.PUBLIC_PATH_CSS));

app.get('/',(req,res)=>{
    res.render('index',{jquery_ui_css: DepPaths.JQUERY_UI_CSS});
});

app.listen(PORT,()=>{
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});