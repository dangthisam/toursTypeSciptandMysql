import {Express} from "express";
import toursRouter from "./tours.router";
import categoriesRouter from "./categories.router";
const clientRouter = (app: Express): void => {
  app.use("/tours", toursRouter);
  app.use("/categories", categoriesRouter);
};

export default clientRouter;