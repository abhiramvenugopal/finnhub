
const finnhub = require('finnhub');
const express=require("express");
const app=express();
const basic=require('./basic');
const dotenv = require('dotenv');
const websocketModule=require('./websocketModule')
dotenv.config();



app.use("/api/v1/basic",basic)

app.listen(process.env.PORT,()=>{
    console.log("server started at port : " +process.env.PORT)
})

websocketModule.openConnection() // it will open a web hook connection 
