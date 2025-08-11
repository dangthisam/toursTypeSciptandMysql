
import { Request , Response  } from "express" 
import Category from "../../model/categories.model";
const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll({
      where:{
        deleted: false,
        status: "active"
      }
    });


res.render("client/pages/categories/index.pug" ,{
  pageTitle:"Danh mục tours",
  categories:categories
})
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllCategories };
