import express , {Express, Request , Response } from "express";
import path from "path";
import sequelize from "./config/connectDB";
import indexRouterClient from "./router/client/index.router"
const app: Express = express();
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
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
