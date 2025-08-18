import { Request , Response } from "express";
import Tour from "../../model/tours.model";
export const indexTour =async (req:Request, res:Response) =>{

const tours=await Tour.findAll({
    where:{
        deleted:false
    },
    raw:true
})

for (const item of tours){
    if(item["images"]){
        const image=JSON.parse(item["images"]);
        item["image"]=image[0];
    }
    item["special_Price"]=(item["price"]*(1-item["discount"]/100));

}

console.log(tours)
    res.render("admin/pages/tour/index.pug",{
        titlePage:"Danh sach tour",
        tours:tours
    })
}