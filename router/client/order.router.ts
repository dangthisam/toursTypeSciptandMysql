import express from "express";
import {order } from "../../controller/client/order.controller";
const router = express.Router();

router.post("/" , order);
export default router;
