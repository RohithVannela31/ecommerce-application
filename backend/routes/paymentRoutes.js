import express from "express";
import {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyPaymentAndCreateOrder);

export default router;
