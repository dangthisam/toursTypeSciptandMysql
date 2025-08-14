import { Request, Response  }    from "express";

export const indexCart = (req: Request, res: Response): void => {
 
    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
   
    });
}