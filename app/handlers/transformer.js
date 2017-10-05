
class Transformer {


  createClient (data) {
    var fullName = `${data.first_name} ${data.last_name}`
    var source = {
      name: fullName,
      address1: data.address_1,
      address2: data.address_2,
      city: data.city,
      state: data.state,
      country: data.country,
      postal_code: data.zipcode,
      id_number: data.uid,
      custom_value1: data.custom_value_client1,
      custom_value2: data.custom_value_client2,
      contact: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone_number,
        custom_value1: data.custom_value_contact1,
        custom_value2: data.custom_value_contact2
      }
    }
    return JSON.stringify(source)
  }

  createInvoice (data) {

    var source = {
      amount: data.total,
      balance: data.total,
      client_id: data.client_public_id,
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
      custom_text_value1: data.chargify_id,
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
      `\r\nDashboard URL: ${data.db_url}` +
      `\r\bImported from Dashboard`
    return publicNotes
  }

  createRefund (data) {

    var source = {
      amount: -Math.abs(data.amount),
      invoice_id: data.invoice_public_id,
      payment_date: data.settled_at,
      private_notes: data.reason + `\r\nDB Refund Id: ${data.id}` + `\r\nRefund Type: ${data.refund_type}` + '\r\nBraintree Account: Collegeplus1',
      payment_type_id: this.refundType(data.refund_type),
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(source)
  }

  refundType (refundType) {
    const CREDIT_CARD_OTHER = 13
    const CHECK = 16

    if (refundType === 'credit_card') {
      return CREDIT_CARD_OTHER
    } else if (refundType === 'check') {
      return CHECK
    } else {
      return ''
    }
  }

  createPayment (data) {
    const CREDIT_CARD_OTHER = 13
    var source = {
      amount: data.amount,
      invoice_id: data.invoice_public_id,
      payment_type_id: CREDIT_CARD_OTHER,
      payment_date: data.settled_at,
      private_notes: 'Braintree Account: Collegeplus1',
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(source)
  }

  createCheck (data) {
    const CHECK = 16
    var check = {
      amount: data.amount,
      invoice_id: data.invoice_public_id,
      payment_type_id: CHECK,
      payment_date: data.created_at,
      private_notes: `Check Entry from Dashboard. The transaction_reference is the check number.`,
      transaction_reference: data.number
    }
    return JSON.stringify(check)
  }

  createCredit (data) {
    var credit = {
      amount: data.amount,
      balance: data.amount,
      credit_date: data.created_at,
      client_id: data.client_public_id,
      private_notes: `Dashboard ID: ${data.id} \r\n\ Reason: ${data.reason} \r\n Category: ${data.category}`
    }
    return JSON.stringify(credit)
  }

  createCreditPayment (data) {
    const CREDIT_PAYMENT = 1
    var creditPayment = {
      amount: data.amount,
      invoice_id: data.invoice_public_id,
      payment_type_id: CREDIT_PAYMENT,
      payment_date: data.created_at,
      private_notes: 'Credit Memo applied to account from Dashboard.',
      transaction_reference: data.id
    }
    return JSON.stringify(creditPayment)
  }

}

export default new Transformer()
