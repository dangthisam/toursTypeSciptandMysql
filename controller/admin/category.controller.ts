import { Request, Response } from "express";
import Category from "../../model/categories.model";

export const indexCategory = async (req:Request , res:Response) =>{

    const categories =await Category.findAll({
        where:{
            deleted:false,
            status:"active"
        }
    })
    console.log(categories)
    res.render("admin/pages/category/index.pug",{
        titlePage:"Quản lý danh mục",
        categories:categories
    })
}