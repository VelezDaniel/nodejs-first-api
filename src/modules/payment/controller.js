
export const createOrder = (req, res) => {
  const order = {
    intent: "CAPTURE",
    purchase_units : [
      {
        amount : {
          currency_code: "COP",
          value: "100.00"
        }
      }
    ]
  }
  res.send('ORDER CREATED');
}

export const captureOrder = (req, res) => res.send('ORDER CAPTURED');

export const cancelPayment = (req, res) => res.send('Cancel Payment');