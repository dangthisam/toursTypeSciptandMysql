
import { Request , Response } from "express";

 export const order = (req: Request, res: Response): void => {
 const data = req.body;
 console.log("Order data received:", data);
  res.status(200).json({ message: "Order received" });
};

