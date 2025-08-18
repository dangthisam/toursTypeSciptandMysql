import { Request , Response } from "express";
import Tour from "../../model/tours.model";
import Category from "../../model/categories.model";
import { generateOrderCodeTour } from "../../helps/generate";
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


    res.render("admin/pages/tour/index.pug",{
        titlePage:"Danh sach tour",
        tours:tours
    })
}

export const createTour =async (req:Request , res:Response) =>{

    const category =await Category.findAll({
        where:{
            deleted:false,
            status:"active"
        },
        raw:true
    })
    res.render("admin/pages/tour/create.pug",{
        titlePage:"Tao tua moi",
        categories:category
    })
}

export const postCreateTour =async (req:Request, res:Response)=>{
    const countTour=await Tour.count();
    if(req.body.position==""){
        req.body.position=countTour+1;

    }else{
        req.body.position=parseInt(req.body.position)
    }
   
    const data=req.body;
    const code =generateOrderCodeTour(countTour+1);
    const dataTour={
        title:req.body.title,
        price:parseInt(req.body.price),
        code:code,
        discount:parseInt(req.body.discount),
        stock:parseInt(req.body.stock),
        timeStart:req.body.timeStart,
        position:req.body.position,
        status:req.body.status
        

    }
    console.log(dataTour)
 
}