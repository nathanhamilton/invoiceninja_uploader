import config from './config'
import prompt from 'prompt'
import csvconverter from './handlers/csv-converter'

prompt.start()

console.log(`Looks like we are using ${config.INVOICE_NINJA_API_URL}`)
console.log('Shall we proceed with the update? (y/n)')

prompt.get(['confirm_environment'], function (err, result) {
  if (result.confirm_environment == 'Yes' || result.confirm_environment == 'y' || result.confirm_environment == 'Y' || result.confirm_environment == 'yes') {

    console.log('\r\nPlease select which of the following you would like to upload: ')
    console.log('UPLOAD: clients, invoices, payments, refunds, credits, credit_payments, checks.')
    console.log('ACTIONS: delete_payments, delete_credits, delete-invoices, voucher-invoices, update-invoices.')

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
      } else if (result.upload_type == 'voucher-invoices') {
        console.log(result.upload_type + 'Great, where is the file located?')
        prompt.get(['file_location'], function (err, result) {
          console.log(result.file_location)
          csvconverter.createVoucherInvoices(result.file_location)
        })
      } else if (result.upload_type == 'update-invoices') {
        console.log(result.update_type + 'Great, where is the file located?')
        prompt.get(['file_location'], function (err, result) {
          console.log(result.file_location)
          csvconverter.updateInvoice(result.file_location)
        })
      } else {
        console.log("I'm sorry, I didn't recognize the input type of: " + result.upload_type)
      }
    })
  } else {
    console.log('OK, you can configure the environment in the .env file to change QA vs Prod\'s API.')
  }
})
