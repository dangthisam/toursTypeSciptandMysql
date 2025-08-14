import {Express} from "express";
import toursRouter from "./tours.router";
import categoriesRouter from "./categories.router";
import cartRouter from "./cart.router";
const clientRouter = (app: Express): void => {
  app.use("/tours", toursRouter);
  app.use("/categories", categoriesRouter);
  app.use("/cart", cartRouter);
};

export default clientRouter;