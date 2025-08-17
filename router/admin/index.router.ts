import { Express } from "express";
import systemConfig from "../../config/system";
import categoryRoute from "./category.route"
const mainAdminRouter = (app: Express): void => {
  const PATH_ADMIN = `${systemConfig.prefixAdmin}`;
  app.use(
    `${PATH_ADMIN}/category`,
    categoryRoute
  );

};

export default mainAdminRouter;
