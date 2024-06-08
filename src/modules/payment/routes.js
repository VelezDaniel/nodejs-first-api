
import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';

const router = Router();

const createOrder = async (req, res) => {
  try {
    const response = await ctrl.createOrder();
    console.log(response)
    succes(req, res, response, 200)
  } catch (error) {
    console.log("routes: ", error)
  }
}

const captureOrder = async (req, res) => {
  try {
    const response = await ctrl.captureOrder();
    console.log(response)
    succes(req, res, response, 200)
  } catch (error) {
    console.log("routes: ", error)
  }
}

router.post('/create-order', createOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-order', cancelPayment);

export default router;