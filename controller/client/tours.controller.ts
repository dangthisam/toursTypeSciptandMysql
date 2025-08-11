
import { Request, Response } from "express";
import Tour from "../../model/tours.model"
export const getAllTours = async (req: Request, res: Response): Promise<void> => {
  const tours = await Tour.findAll({
    where:{
        deleted: false ,
        status:"active"
    },
    raw: true,
  });

  res.render("client/pages/tours/index.pug", { 
    tours: tours,
    pageTitle:"Danh sách tour"
   });
};

