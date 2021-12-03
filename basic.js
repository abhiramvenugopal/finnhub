const express=require("express");
const router=express.Router();
const finnhub = require('finnhub');
const websocketModule=require('./websocketModule')

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c6gsmn2ad3iej642vfi0"                 //api key for finnhub
const finnhubClient = new finnhub.DefaultApi() 


//REST API for subscribe for an event in webhook it will accept two parameters 'symbol' and 'type'
router.get("/subscribe", function(req,res){
    try{
        websocketModule.addEvent(req.query.type,req.query.symbol)
        res.status(200).json({status:"success"})
        
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }

})

//REST API for unsubscribe for an event in webhook it will accept two parameters 'symbol' and 'type'
router.get("/unsubscribe", function(req,res){
    try{
        websocketModule.unsubscribe(req.query.type,req.query.symbol)
        res.status(200).json({status:"success"})
        
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }

})


//REST API for finding symbol for an company. it will accept company name and return an array of symbol details
router.get("/symbol", function(req,res){
    try{
        
        finnhubClient.symbolSearch(req.query.name, (error, data, response) => {
            var responseData=data.result
            var filteredData=responseData.filter((obj)=>{
                return (obj.description.toLowerCase().includes(req.query.name.toLowerCase()) )

            })
            
            console.log(req.query.name)
            res.status(200).json({status:"success",response:filteredData})  
          });
             
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }

})

//REST API for getting market news it will accept category and return an array of news details
router.get("/market-news", function(req,res){
    try{
        
        finnhubClient.marketNews(req.query.category, (error, data, response) => {
            if(error){
                console.log(error)
            }
            res.status(200).json({status:"success",response:data})  
          });
             
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }

})


//REST API for calculating avarage surprise earning. it will accept symbol an return an object contains some avarage surprise earnings
//avarage surprise earnings is cal calulated from values getting from  surprise earnings API in finnhub
router.get("/avarage/earningsurprise", function(req,res){
    try{
        finnhubClient.companyEarnings(req.query.symbol, {'limit': req.query.limit}, (error, data, response) => {
            console.log(data)
            let estimate=0
            let surprise=0
            let surprisePercent=0
            let startPeriod=data[0].period
            let endPeriod=data[data.length-1].period
            for(obj of data){
                estimate+=obj.estimate
                surprise+=obj.surprise
                surprisePercent+=obj.surprisePercent
            }
            estimate=estimate/(data.length)
            surprise=surprise/(data.length)
            surprisePercent=surprisePercent/(data.length)
            result={estimate,surprise,surprisePercent,startPeriod,endPeriod}
            res.status(200).json({status:"success",earningsurprise:result})
          });
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err
        })
    }

})


module.exports=router