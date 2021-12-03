Basic Financials
Get company basic financials such as margin, P/E ratio, 52-week high/low etc.

Method: GET

Examples:

/stock/metric?symbol=AAPL&metric=all

Arguments:

symbolREQUIRED
Symbol of the company: AAPL.

metricREQUIRED
Metric type. Can be 1 of the following values all

Response Attributes:

metric
Map key-value pair of key ratios and metrics.

metricType
Metric type.

series
Map key-value pair of time-series ratios.

symbol
Symbol of the company.



finnhubClient.companyBasicFinancials("AAPL", "all", (error, data, response) => {
  console.log(data)
});



