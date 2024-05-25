
import { Router } from "express";
import { cancelPayment, captureOrder, createOrder } from "./controller.js";

const router = Router();


router.get('/create-order', createOrder);

router.get('/capture-order', captureOrder);

router.get('/cancel-order', cancelPayment);

export default router;