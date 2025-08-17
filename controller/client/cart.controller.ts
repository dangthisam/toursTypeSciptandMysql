import { Request, Response  }    from "express";
import Tour from "../../model/tours.model";

export const indexCart = (req: Request, res: Response): void => {
 
    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
   
    });
}

export const dataCart = async (req: Request, res: Response): Promise<void> => {
   const tourCart = req.body;
   for (const tour of tourCart) {
       const infoTour=await Tour.findOne({
        where:{
            id: tour.tourId,
            deleted:false,
            status :"active"
        },
        raw :true,
       })
       tour["infoTour"] = infoTour;
       tour["price_special"] =infoTour["price"] *(1-infoTour["discount"] /100);

       tour["image"] =JSON.parse(infoTour["images"])[0];
       tour["totalPrice"] = tour["price_special"] * tour["quantity"];
       console.log(infoTour);
   }
    res.json({
        message: "Cart data",
        code:200,
        tour: tourCart
    });
};