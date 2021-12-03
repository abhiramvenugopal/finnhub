const WebSocket=require('ws')
const socket = new WebSocket('wss://ws.finnhub.io?token=c6gsmn2ad3iej642vfi0');

//function to create a connection to finnhub webhook
function openConnection(){
    // Connection opened -> Subscribe -- by default here its subscribed for Price Updates of AAPL
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        let arr=JSON.parse(event.data).data
        if(arr){
            arr.forEach(element => {
                console.log("======Last Price Updates")
                console.log("Symbol : "+element.s+" LastPrice : "+element.p+" TimeStamp : "+element.t+"  Volume : "+element.v )
                console.log("")
                console.log("")
    
            });
        }
        
});
}
//function for subscribe  any event on webhook
function addEvent(type,symbol){
    socket.send(JSON.stringify({'type':type, 'symbol': symbol}))
}
//function for unsubscribe  any event on webhook
var unsubscribe = function(type,symbol) {
    socket.send(JSON.stringify({'type':type,'symbol': symbol}))
}
module.exports={openConnection,addEvent,unsubscribe}