
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send('Accedi al tuo account');
});

app.listen(3000);