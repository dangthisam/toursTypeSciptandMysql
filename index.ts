import express , {Express, Request , Response } from "express";
import path from "path";
const app: Express = express();
// 7. View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/tours", (req: Request, res: Response) => {
res.render("client/pages/tours/index.pug")
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
