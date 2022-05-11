const express=require('express');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const app=express();
const cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
dotenv.config({path:'./env/.env'});

app.use(cookieParser());


app.use('/', require('./routes/router'))

app.listen(5000,()=>{
    console.log('5000')
});