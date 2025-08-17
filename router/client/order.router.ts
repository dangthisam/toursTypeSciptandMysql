import express from "express";
import {order , getOrderSuccess } from "../../controller/client/order.controller";

const router = express.Router();

router.post("/" , order);
router.get("/success", getOrderSuccess);
export default router;
