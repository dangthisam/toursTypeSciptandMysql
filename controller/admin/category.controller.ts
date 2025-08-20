import { Request, Response } from "express";
import Category from "../../model/categories.model";

export const indexCategory = async (req:Request , res:Response) =>{

    const categories =await Category.findAll({
        where:{
            deleted:false,
            status:"active"
        }
    })
    
    res.render("admin/pages/category/index.pug",{
        titlePage:"Quản lý danh mục",
        categories:categories
    })
}


export const deleteCategory =async(req:Request, res:Response) =>{
    const id=req.params.id;
console.log(id)
    await Category.update({
               deleted:true
    },{
        where:{
id:id
        }
    })
    res.json({
        code:200,
        message:"Delete success"
    })
}