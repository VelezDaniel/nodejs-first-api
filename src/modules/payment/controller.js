import config from "../../config.js";
import axios from "axios";

const host = "http://localhost:" + config.app.port + "/api/payment";

export const createOrder = async (req, res) => {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "3.00"
        }
      }
    ],
    application_context: {
      brand_name: "helartico",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${host}/capture-order`,
      cancel_url: `${host}/cancel-order`,
    }
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const { data: { access_token }, } = await axios.post(`${config.payment.paypalApi}/v1/oauth2/token`, params, {
    auth: {
      username: config.payment.paypalApiClient,
      password: config.payment.paypalApiKey,
    }
  })

  const response = await axios.post(`${config.payment.paypalApi}/v2/checkout/orders`, order, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  console.log(response.data);
  return res.json(response.data);
}

export const captureOrder = async (req, res) => {
  const { token } = req.query
  const response = await axios.post(`${config.payment.paypalApi}/v2/checkout/orders/${token}/capture`, {}, {
    auth: {
      username: config.payment.paypalApiClient,
      password: config.payment.paypalApiKey
    }
  });

  console.log(response.data)

  return response;
}

export const cancelPayment = (req, res) => res.redirect(config.frontend.url);