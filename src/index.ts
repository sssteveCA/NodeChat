
import express from 'express';
import mustacheExpress from 'mustache-express';
import { StaticPaths } from './modules/static_paths';
import { DepPaths } from './modules/dependencies_paths';
import path from 'path';
const app = express();
const PORT: number = 3000;
const public_path: string = path.join('dist','public');

console.log(DepPaths.JQUERY_UI_CSS);

app.engine('mustache',mustacheExpress());
app.set('view engine','mustache');
app.set('views', __dirname+'/views');
//app.use(express.static(StaticPaths.public_path));
app.use('/css',express.static(StaticPaths.PUBLIC_PATH_CSS));

app.get('/',(req,res)=>{
    res.send('Accedi al tuo account');
});

app.listen(PORT,()=>{
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});