import {Express} from "express";
import toursRouter from "./tours.router";

const clientRouter = (app: Express): void => {
  app.use("/tours", toursRouter);
};

export default clientRouter;