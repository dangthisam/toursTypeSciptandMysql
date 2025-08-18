import { Express } from "express";
import systemConfig from "../../config/system";
import categoryRoute from "./category.route"
import tourRouter from "./tour.router"
const mainAdminRouter = (app: Express): void => {
  const PATH_ADMIN = `${systemConfig.prefixAdmin}`;
  app.use(
    `${PATH_ADMIN}/category`,
    categoryRoute
  );

  app.use(
    `${PATH_ADMIN}/tours`,
  tourRouter
  )

};

export default mainAdminRouter;
