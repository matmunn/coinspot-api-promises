const hmac = require("crypto").createHmac,
      axios = require('axios')

function coinspot(key, secret) {
    var self = this
    self.key = key
    self.secret = secret

    const request = (path, postdata) => {
        const nonce = new Date().getTime()

        postdata = postdata || {}
        postdata.nonce = nonce

        let stringmessage = JSON.stringify(postdata)
        let signedMessage = new hmac("sha512", self.secret)

        signedMessage.update(stringmessage)

        const sign = signedMessage.digest('hex')

        let options = {
            baseURL: 'https://www.coinspot.com.au',
            method: 'POST',
            url: path,
            headers: {
                'Content-Type': 'application/json',
                'sign': sign,
                'key': self.key
            }
        }

        if (JSON.stringify(postdata) !== "{}") {
            options.data = postdata
        }

        return axios.request(options)
    }

    self.sendcoin = (cointype, amount, address) => {
        return request('/api/my/coin/send', { cointype, amount, address })
    }

    self.coindeposit = cointype => {
        return request('/api/my/coin/deposit', { cointype })
    }

    self.quotebuy = (cointype, amount) => {
        return request('/api/quote/buy', { cointype, amount })
    }

    self.quotesell = (cointype, amount) => {
        return request('/api/quote/sell', { cointype, amount })
    }

    self.balances = () => {
        return request('/api/my/balances', {})
    }

    self.orders = (cointype) => {
        return request('/api/orders', { cointype })
    }

    self.myorders = () => {
        return request('/api/my/orders', {})
    }

    self.spot = () => {
        return request('/api/spot', {})
    }

    self.buy = (cointype, amount, rate) => {
        return request('/api/my/buy', { cointype, amount, rate })
    }

    self.sell = (cointype, amount, rate) => {
        return request('/api/my/sell', { cointype, amount, rate })
    }
}

module.exports = coinspot
