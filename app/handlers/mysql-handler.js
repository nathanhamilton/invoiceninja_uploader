import config from '../config'
import mysql from 'mysql'

class MysqlHandler {

  constructor () {
    this.pool = mysql.createPool({
      connectionLimit: 100,
      host: config.INVOICE_NINJA_DB_HOST,
      user: config.INVOICE_NINJA_USERNAME,
      password: config.INVOICE_NINJA_PASSWORD,
      database: config.INVOICE_NINJA_DATABASE,
      debug: false,
      port: config.INVOICE_NINJA_PORT
    })
  }

  findInvoiceByCustomId (customId, callback) {
    console.log(customId)
    this.pool.getConnection(function(err, conn) {
      if (err) {
        console.error(err)
        callback(err, null)
        return
      }
      conn.query('select * from invoices where custom_text_value2 = ? and is_deleted = false limit 1;', [customId], function(err, rows, fields) {
        conn.release()
        if (err) {
          console.error('Error while performing Query.')
          callback(err, null)
          return
        }

        if (rows.length > 0) {
          callback(null, rows[0])
        } else {
          callback('Empty Rows', [])
        }
      })
    })
  }
}

export default new MysqlHandler()