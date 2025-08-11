import express, {Request , Response } from "express";
import Tour from "../../model/tours.model"
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true,
  });
  console.log(tours);
  res.render("client/pages/tours/index.pug", { tours });
});

export default router;
