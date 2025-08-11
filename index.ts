import express , {Express, Request , Response } from "express";
import path from "path";
import sequelize from "./config/connectDB";
import Tour from "./model/tours.model";
const app: Express = express();
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;

// connect to database
sequelize.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// 7. View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true,
  });
  console.log(tours);
  res.render("client/pages/tours/index.pug", { tours });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
