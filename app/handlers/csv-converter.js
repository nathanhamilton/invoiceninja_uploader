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
        ninja.getClientByUid(data.student_uid, function(err, body) {
          var clientBody = JSON.parse(body).data[0]
          var convertInvoice = transformer.createInvoice(data, clientBody.id)
          ninja.createInvoice(convertInvoice)
        })
      })
  }

  convertPayments (pathToPaymentsFile) {
    fs.createReadStream(pathToPaymentsFile)
      .pipe(csvParse({separator: ','}))
      .on('data', function(data) {
        var customId = data.db_id
        mysqlHandler.findInvoiceByCustomId(customId, function(err, invoice) {
          if (err) {
            console.log(err)
          } else {
            var createPayment = transformer.createPayment(data, invoice.public_id)
            ninja.createPayment(createPayment)
          }
        })
      })
  }

  convertRefunds (pathToRefundsFile) {
    fs.createReadStream(pathToRefundsFile)
      .pipe(csvParse({separator: ','}))
      .on('data', function(data) {
        var customId = data.db_id
        mysqlHandler.findInvoiceByCustomId(customId, function(err, invoice) {
          if (err) {
            console.log(err)
          } else {
            var createRefund = transformer.createRefund(data, invoice.public_id)
            ninja.createRefund(createRefund)
          }
        })
      })
  }

}

export default new CSVConverter()
