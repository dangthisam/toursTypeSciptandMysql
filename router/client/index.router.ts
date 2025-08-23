import {Express} from "express";
import toursRouter from "./tours.router";
import categoriesRouter from "./categories.router";
import cartRouter from "./cart.router";
import orderRouter from "./order.router"
import userRouter from "./user.router"
import {authenticateToken} from "../../middleware/client/jwtAuth.middleware"
const clientRouter = (app: Express): void => {
  app.use("/tours",toursRouter);
  app.use("/categories", categoriesRouter);
  app.use("/cart", cartRouter);
  app.use("/order",orderRouter);
  app.use("/user" , userRouter)
};

export default clientRouter;