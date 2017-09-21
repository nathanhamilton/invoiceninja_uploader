import config from '../config'
var request = require('request'),
  throttledRequest = require('throttled-request')(request);

throttledRequest.configure({
  requests: 5,
  milliseconds: 1000
})

class InvoiceNinja {

  getClientByUid (uidToReference, callback) {
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/clients?id_number=${uidToReference}`,
      method: 'GET',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {
      console.log(`Looking up uid: ${uidToReference}`)

      if (body === undefined || res.statusCode === undefined) return callback(null, '')
      if (res.statusCode !== 200 || err) {
        console.log(`Error found in looking up client with uid ${uidToReference}, the error returned was: ${err}`)
        console.dir(body)
        console.dir(res)
        callback(err, null)
      } else {
        callback(null, body)
      }
    })
  }

  createInvoice (jsonInvoice, callback) {
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/invoices`,
      method: 'POST',
      body: jsonInvoice,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (body === undefined || res.statusCode === undefined) return callback(null, '')
      if (res.statusCode !== 200 || err) {
        console.log(`Invoice was not created for ${jsonInvoice}`)
        console.log(`Body of the request: ${body}`)
      } else {
        console.log('Invoice was successfully created.')
      }
    })
  }

  createPayment (jsonPayment, callback) {
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/payments`,
      method: 'POST',
      body: jsonPayment,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    console.log(options)

    throttledRequest(options, function(err, res, body) {
      console.log(body)

      if (body === undefined || res.statusCode === undefined) return callback(null, '')
      if (res.statusCode !== 200 || err) {
        console.log(`Payment was not created for ${jsonInvoice}`)
        console.log(`Body of the request: ${body}`)
      } else {
        console.log('Payment successfully created.')
      }
    })
  }

  createPayment (jsonRefund, callback) {
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/payments`,
      method: 'POST',
      body: jsonRefund,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    console.log(options)

    throttledRequest(options, function(err, res, body) {
      console.log(body)

      if (body === undefined || res.statusCode === undefined) return callback(null, '')
      if (res.statusCode !== 200 || err) {
        console.log(`Payment was not created for ${jsonInvoice}`)
        console.log(`Body of the request: ${body}`)
      } else {
        console.log('Payment successfully created.')
      }
    })
  }
}

export default new InvoiceNinja()