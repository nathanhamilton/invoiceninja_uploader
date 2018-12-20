
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
      custom_value1: data.custom_value_client1, //company
      custom_value2: data.custom_value_client2, //category
      contact: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone_number,
        custom_value1: data.custom_value_contact1, //channel
        custom_value2: data.custom_value_contact2  //employee_id
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
      public_notes: data.public_notes,
      invoice_type_id: 1,
      is_recurring: false,
      frequency_id: 1,
      is_amount_discount: true,
      discount: data.discount,
      auto_bill: false,
      has_expenses: false,
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
      `Student Name: ${data.counseling_name}` +
      `\r\nProduct Name: ${data.program_name}` +
      `\r\nStudent UID: ${data.uid}` +
      `\r\nEmployer: ${data.employer}` +
      `\r\nEmployer Type: ${data.employer_type}` +
      `\r\nImported from Salesforce`
    return publicNotes
  }

  //`\r\nEnrollment Description: ${data.name}` +
  // custom_text_value1: data.custom_text_value1,
  //
  //  addNotesData (data) {
  //    var publicNotes =
  //      `Client Name: ${data.name}` +
  //      `\r\nClient UID: ${data.id_number}` +
  //      `\r\nEmployee Category: ${data.employee_category}` +
  //      `\r\nEmployee ID: ${data.employee_id}` +
  //      `\r\nTransferred from individual client accounts`
  //    return publicNotes
  //  }

  // custom_text_value2: data.invoice_public_id,
  //

  //custom_text_value2: data.db_id,
  //
  //addNotesData (data) {
  //  var publicNotes =
  //    `Program ID: ${data.program_id}` +
  //    `\r\nProgram Name: ${data.program_name}` +
  //    `\r\nEnrollment Description: ${data.name}` +
  //    `\r\nDashboard Student Id: ${data.student_id}` +
  //    `\r\nDashboard Invoice id: ${data.id}` +
  //    `\r\nDashboard URL: ${data.db_url}` +
  //    `\r\bImported from Dashboard`
  //  return publicNotes
  //}

  createRefund (data) {

    var source = {
      amount: -Math.abs(data.amount),
      invoice_id: data.invoice_public_id,
      payment_date: data.settled_at,
      private_notes: data.reason + `\r\nRefund Type: ${data.refund_type}`,
      payment_type_id: this.refundType(data.refund_type),
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(source)
  }

  //private_notes: data.reason + `\r\nRefund Type: ${data.refund_type}`,

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
      private_notes: `Imported from Shopify transactions. Exact transaction number not known`,
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(source)
  }

  // private_notes: `Dashboard Payment ID ${data.id}` + "\r\nBraintree Account Collegeplus1" + `\r\nDashboard Invoice ID ${data.invoice_id}`,

  createCheck (data) {
    const CHECK = 16
    var check = {
      amount: data.amount,
      invoice_id: data.invoice_public_id,
      payment_type_id: CHECK,
      payment_date: data.created_at,
      private_notes: `Check Entry from EdCor Paperwork.`,
      transaction_reference: data.id
    }
    return JSON.stringify(check)
  }

  createCredit (data) {
    var credit = {
      amount: data.write_off_amount,
      balance: data.write_off_amount,
      credit_date: data.settled_at,
      client_id: data.client_public_id,
      private_notes: `Check Number: ${data.transaction_id} \r\n\ Reason: ${data.reason} \r\n Category: ${data.category}`
    }
    return JSON.stringify(credit)
  }

  // private_notes: `Reason: ${data.reason}`
  // private_notes: `Dashboard ID: ${data.id} \r\n\ Reason: ${data.reason} \r\n Category: ${data.category}`

  createCreditPayment (data) {
    const CREDIT_PAYMENT = 1
    var creditPayment = {
      amount: data.write_off_amount,
      invoice_id: data.invoice_public_id,
      payment_type_id: CREDIT_PAYMENT,
      payment_date: data.settled_at,
      private_notes: data.reason,
      transaction_reference: data.transaction_id
    }
    return JSON.stringify(creditPayment)
  }

  addVoucherNotes (data) {
    var publicNotes =
      `Student Name: ${data.student_name}` +
      `\r\nStudent UID: ${data.uid}` +
      `\r\nStudent Identifier: ${data.student_identifier}` +
      `\r\nInvoice Url: ${data.invoice_url}` +
      `\r\nVoucher Number: ${data.voucher_number}` +
      `\r\nVoucher URL: ${data.voucher_link}`
    return publicNotes
  }

  createVoucherInvoice (data) {
    var source = {
      amount: data.total,
      balance: data.total,
      client_id: data.client_public_id,
      invoice_status_id: 2,
      discount: 0,
      invoice_date: data.created_at,
      due_date: data.created_at,
      public_notes: this.addVoucherNotes(data),
      invoice_type_id: 1,
      is_recurring: false,
      frequency_id: 1,
      is_amount_discount: true,
      auto_bill: false,
      has_expenses: false,
      custom_text_value1: '',
      custom_text_value2: data.invoice_id,
      is_public: true,
      invoice_items: this.voucherInvoiceItems(data)
    }
    return JSON.stringify(source)
  }

  voucherInvoiceItems (data) {
    var itemsArray = []
    for (var i=1; i<6; i++) {
      var methodName = `course${i}_name`
      var methodCost = `course${i}_cost`
      if (data[methodName] != '') {
        var hashObj = {
          product_key: 'Course Voucher',
          notes: data[methodName],
          cost: data[methodCost],
          qty: 1
        }
        itemsArray.push(hashObj)
      }
    }
    return itemsArray
  }

  updateInvoiceParams (data) {
    var source = {
      invoice_public_id: data.invoice_public_id,
      amount: data.amount,
      balance: data.balance,
      cost: data.cost,
      discount: data.discount
    }
    return JSON.stringify(source)
  }

  updateInvoice (rawData, updateParams) {
    let payload = JSON.parse(rawData).data
    let params = JSON.parse(updateParams)

    payload.amount = params.amount
    payload.balance = params.balance
    payload.invoice_items[0].cost = params.cost
    payload.discount = params.discount

    return JSON.stringify(payload)
  }
}

export default new Transformer()
