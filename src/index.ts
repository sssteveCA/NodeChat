
import express from 'express';
import { StaticPaths } from './modules/static_paths';
import path from 'path';
const app = express();
const PORT: number = 3000;
const public_path: string = path.join('dist','public');


app.use(express.static(StaticPaths.public_path));
app.use('/css',express.static(StaticPaths.public_path_css));

app.get('/',(req,res)=>{
    res.send('Accedi al tuo account');
});

app.listen(PORT,()=>{
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});