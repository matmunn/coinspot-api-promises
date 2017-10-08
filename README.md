Please see https://www.coinspot.com.au/api for documentation on the CoinSpot API.


Example usage

```javascript
var coinspot = require('coinspot-api-promises');

var secret = ''; // insert your secret here
var key = ''; // insert your key here

var client = new coinspot(key, secret);

client.orders('LTC').then(response => {
 	console.log(response.data);
});
```

Functions retain the same signatures as they have in [coinspot-api](https://github.com/rtw/npm-coinspot-api), which this project is based off.
