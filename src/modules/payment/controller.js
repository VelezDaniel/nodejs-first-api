import config from "../../config.js";
import axios from "axios";

const host = "http://localhost:" + config.app.port + "/api/payment";

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(`https://v6.exchangerate-api.com/v6/${config.exchangeRateApiKey}/latest/${fromCurrency}`);
  return response.data.conversion_rates[toCurrency];
};

export const createOrder = async (req, res) => {
  const price = req.body.totalPriceOrder;

  const exchangeRate = await getExchangeRate('COP', 'USD');
  const amountInUSD = (price * exchangeRate).toFixed(2);

  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amountInUSD,
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
  // return response;
  res.redirect(`${config.frontend.url}/payed`);
}

export const cancelPayment = (req, res) => res.redirect(`${config.frontend.url}/payment-canceled`);