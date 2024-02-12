import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";

export const paymentRouter = Router();

paymentRouter.post("/create-order", PaymentController.createOrder);

paymentRouter.get("/capture-order", PaymentController.captureOrder);

paymentRouter.get("/cancel-order", PaymentController.cancelOrder);
