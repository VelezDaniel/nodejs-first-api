
import { Router } from "express";
import { createOrder, captureOrder, cancelPayment } from "./controller.js";

const router = Router();

router.post('/create-order', createOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-order', cancelPayment);

export default router;