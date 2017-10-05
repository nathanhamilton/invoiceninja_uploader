import config from '../config'
import fs from 'fs'
var request = require('request'),
  throttledRequest = require('throttled-request')(request);

throttledRequest.configure({
  requests: 1,
  milliseconds: 300
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
        console.log(`Body of the request: ${body}`)
        callback(err, null)
      } else {
        callback(null, body)
      }
    })
  }

  createClient (jsonClient, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/clients`,
      method: 'POST',
      body: jsonClient,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Client was not created for ${jsonClient}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log('Client was successfully created.')
      }
    })
  }

  createInvoice (jsonInvoice, callback) {
    var self = this
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

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Invoice was not created for ${jsonInvoice}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log('Invoice was successfully created.')
      }
    })
  }

  createPayment (jsonPayment, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/payments`,
      method: 'POST',
      body: jsonPayment,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Payment was not created for ${jsonPayment}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log('Payment successfully created.')
      }
    })
  }

  createRefund (jsonRefund, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/payments`,
      method: 'POST',
      body: jsonRefund,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Payment was not created for ${jsonRefund}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log('Refund successfully created.')
      }
    })
  }

  createCheck (jsonCheck, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/payments`,
      method: 'POST',
      body: jsonCheck,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Check was not created for ${jsonCheck}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log('Check successfully created.')
      }
    })
  }

  createCredit (jsonCredit, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/credits`,
      method: 'POST',
      body: jsonCredit,
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Credit was not created for ${jsonCredit}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log('Credit successfully created.')
      }
    })
  }

  deletePayment (paymentPublicId, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/payments/${paymentPublicId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Credit was not created for ${paymentPublicId}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log(`Payment ${paymentPublicId} was successfully deleted`)
      }
    })
  }

  deleteCredit (creditPublicId, callback) {
    var self = this
    let options = {
      uri: `${config.INVOICE_NINJA_API_URL}/api/v1/credits/${creditPublicId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Ninja-Token': config.INVOICE_NINJA_API_KEY
      }
    }

    throttledRequest(options, function(err, res, body) {

      if (res.statusCode !== 200 || res.statusCode == 'undefined') {
        console.log(`Credit was not created for ${creditPublicId}`)
        console.log(`Body of the request: ${body}`)
        self.logIssues(options, err, res)
      } else {
        console.log(`Credit ${creditPublicId} was successfully deleted`)
      }
    })
  }

  logIssues (requestOptions, err, res = null ) {
    var message = {
      request: requestOptions,
      error: err
    }

    fs.writeFileSync('../../api.log', message, 'utf-8')
  }
}

export default new InvoiceNinja()