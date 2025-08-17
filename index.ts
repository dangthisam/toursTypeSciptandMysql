import express , {Express, Request , Response } from "express";
import path from "path";
import bodyParser from "body-parser"
import sequelize from "./config/connectDB";
import indexRouterClient from "./router/client/index.router";
import indexRouterAdmin from "./router/admin/index.router"
import moment from "moment";
import systemConfig from "./config/system";
import dotenv from "dotenv";
const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3000;
  app.use(bodyParser.json());


app.locals.moment=moment
indexRouterAdmin(app);
app.locals.prefixAdmin=systemConfig.prefixAdmin;
indexRouterClient(app);

// connect to database
sequelize.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(express.static(path.join(__dirname, 'public')));


// 7. View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
