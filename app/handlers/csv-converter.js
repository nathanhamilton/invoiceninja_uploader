import csvParse from 'csv-parser'
import fs from 'fs'
import transformer from './transformer'
import ninja from '../lib/invoice-ninja'
import mysqlHandler from './mysql-handler'

class CSVConverter {

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

}

export default new CSVConverter()
