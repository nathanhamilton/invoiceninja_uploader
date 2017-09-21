
class Transformer {

  createInvoice (data, clientId) {

    var source = {
      amount: data.total,
      balance: data.total,
      client_id: clientId,
      invoice_status_id: 2,
      discount: 0,
      invoice_date: data.created_at,
      due_date: data.due_on,
      public_notes: this.addNotesData(data),
      invoice_type_id: 1,
      is_recurring: false,
      frequency_id: 1,
      is_amount_discount: true,
      auto_bill: false,
      has_expenses: false,
      custom_text_value1: '',
      custom_text_value2: data.db_id,
      is_public: true,
      invoice_items: [
        {
          product_key: data.program_name,
          notes: data.program_name,
          cost: data.total,
          qty: 1
        }
      ]
    }
    return JSON.stringify(source)
  }

  addNotesData (data) {
    var publicNotes =
      `Program ID: ${data.program_id}` +
      `\r\nProgram Name: ${data.program_name}` +
      `\r\nEnrollment Description: ${data.name}` +
      `\r\nDashboard Student Id: ${data.student_id}` +
      `\r\nDashboard Invoice id: ${data.id}` +
      `\r\bImported from Dashboard`
    return publicNotes
  }

  createRefund (data, invoiceId) {
    var source = {
      amount: -Math.abs(data.amount),
      invoice_id: invoiceId,
      payment_date: data.created_at,
      private_notes: data.reason + '\r\nBraintree Account: Collegeplus1',
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(source)
  }

  createPayment (data, invoiceId) {
    const CREDIT_CARD_OTHER = 13
    var source = {
      amount: data.amount,
      invoice_id: invoiceId,
      payment_type_id: CREDIT_CARD_OTHER,
      payment_date: data.created_at,
      private_notes: 'Braintree Account: Collegeplus1',
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(source)
  }

}

export default new Transformer()