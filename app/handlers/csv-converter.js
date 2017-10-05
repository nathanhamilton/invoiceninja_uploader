import csvParse from 'csv-parser'
import fs from 'fs'
import transformer from './transformer'
import ninja from '../lib/invoice-ninja'
import mysqlHandler from './mysql-handler'

class CSVConverter {

  createClients (pathToInvoiceFile) {
    fs.createReadStream(pathToInvoiceFile)
      .pipe(csvParse({separator: ','}))
      .on('data', function(data) {
        var createClient = transformer.createClient(data)
        ninja.createClient(createClient)
      })
  }

  convertInvoices (pathToInvoiceFile) {
    fs.createReadStream(pathToInvoiceFile)
      .pipe(csvParse({separator: ','}))
      .on('data', function(data) {
        var convertInvoice = transformer.createInvoice(data)
        ninja.createInvoice(convertInvoice)
      })
  }

  convertPayments (pathToPaymentsFile) {
    fs.createReadStream(pathToPaymentsFile)
      .pipe(csvParse({separator: ','}))
      .on('data', function(data) {
        var createPayment = transformer.createPayment(data)
        ninja.createPayment(createPayment)
      })
  }

  convertRefunds (pathToRefundsFile) {
    fs.createReadStream(pathToRefundsFile)
      .pipe(csvParse({separator: ','}))
      .on('data', function(data) {
        var createRefund = transformer.createRefund(data)
        ninja.createRefund(createRefund)
      })
  }

  convertChecks (pathToChecksFile) {
    fs.createReadStream(pathToChecksFile)
    .pipe(csvParse({separator: ','}))
    .on('data', function(data) {
      var createCheck = transformer.createCheck(data)
      ninja.createCheck(createCheck)
    })
  }

  convertCredits (pathToCreditsFile) {
    fs.createReadStream(pathToCreditsFile)
    .pipe(csvParse({separator: ','}))
    .on('data', function(data) {
      var credit = transformer.createCredit(data)
      ninja.createCredit(credit)
    })
  }

  convertCreditPayments (pathToCreditPaymentsFile) {
    fs.createReadStream(pathToCreditPaymentsFile)
    .pipe(csvParse({separator: ','}))
    .on('data', function(data) {
      var creditPayment = transformer.createCreditPayment(data)
      ninja.createPayment(creditPayment)
    })
  }

  deletePayments (pathToPaymentsFile) {
    fs.createReadStream(pathToPaymentsFile)
    .pipe(csvParse({separator: ','}))
    .on('data', function(data) {
      ninja.deletePayment(data.id)
    })
  }

  deleteCredits (pathToCreditsFile) {
    fs.createReadStream(pathToCreditsFile)
    .pipe(csvParse({separator: ','}))
    .on('data', function(data) {
      ninja.deleteCredit(data.id)
    })
  }
}

export default new CSVConverter()
