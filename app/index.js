import prompt from 'prompt'
import csvconverter from './handlers/csv-converter'

prompt.start()

console.log('Please select which of the following you would like to upload: ')
console.log('clients, invoices, payments, refunds, credits or checks?')

prompt.get(['upload_type'], function (err, result) {

  if (result.upload_type == 'clients') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.createClients(result.file_location)
    })
  } else if (result.upload_type == 'invoices') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.convertInvoices(result.file_location)
    })
  } else if (result.upload_type == 'payments') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.convertPayments(result.file_location)
    })
  } else if (result.upload_type == 'refunds') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.convertRefunds(result.file_location)
    })
  } else if (result.upload_type == 'credits') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.convertCredits(result.file_location)
    })
  } else if (result.upload_type == 'credit_payments') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.convertCreditPayments(result.file_location)
    })
  } else if (result.upload_type == 'checks') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.convertChecks(result.file_location)
    })
  } else if (result.upload_type == 'delete_payments') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.deletePayments(result.file_location)
    })
  } else if (result.upload_type == 'delete_credits') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.deleteCredits(result.file_location)
    })
  } else if (result.upload_type == 'delete-invoices') {
    console.log(result.upload_type + 'Great, where is the file located?')
    prompt.get(['file_location'], function (err, result) {
      console.log(result.file_location)
      csvconverter.deleteInvoices(result.file_location)
    })
  } else {
    console.log("I'm sorry, I didn't recognize the input type of: " + result.upload_type)
  }
})
