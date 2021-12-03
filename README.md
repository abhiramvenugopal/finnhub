# finnhub

steps to be followed to excute the program

  1.npm install 
  2.npm start

API end points

      REST API for finding symbol for an company. it will accept company name and return an array of symbol details

          http://localhost:8006/api/v1/basic/symbol?name=<name>

      REST API for getting market news it will accept category and return an array of news details

          http://localhost:8006/api/v1/basic/market-news?category=<category>

      REST API for calculating avarage surprise earning. it will accept symbol an return an object contains some avarage surprise earnings

          http://localhost:8006/api/v1/basic/avarage/earningsurprise?symbol=<symbol>&limit=<limit>

      REST API for subscribe for an event in webhook it will accept two parameters 'symbol' and 'type'

           http://localhost:8006/api/v1/basic/subscribe?type=<type>&symbol=<symbol>

              type=subscribe or subscribe-news

      REST API for unsubscribe for an event in webhook it will accept two parameters 'symbol' and 'type'

          http://localhost:8006/api/v1/basic/unsubscribe?type=<type>&symbol=<symbol>

            type=unsubscribe or unsubscribe-news
