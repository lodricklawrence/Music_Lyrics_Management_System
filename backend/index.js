const express=require('express');
const app=express();
const controller=require('./controller');
const bodyParser=require('./node_modules/body-parser');
const cors=require('cors');
const PORT=5000;


app.use(bodyParser.json());

app.use(cors());


app.post('/register',controller.register);
app.post('/login',controller.login);
app.get('/readFile/:category/:name/:id',controller.readSongFile);
app.get('/getFile/:id',controller.getFiles);

app.listen(PORT,()=>{
    console.log("server is listening on port "+PORT)
})