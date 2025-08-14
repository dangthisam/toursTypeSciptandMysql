import { Request, Response } from "express";
import sequelize from "../../config/connectDB";
import { QueryTypes } from "sequelize";
export const getAllTours = async (req: Request, res: Response): Promise<void> => {
  const { slugCategory } = req.params;

  try {
    const tours= await sequelize.query(
      `
        SELECT tours.*,round( price * (1 - discount / 100),0) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE categories.slug = :slugCategory
          AND categories.deleted = false
          AND categories.status = 'active'
          AND tours.deleted = false
          AND tours.status = 'active'
      `,
      {
        replacements: { slugCategory },  // bind parameter để tránh SQL injection
        type: QueryTypes.SELECT,  // chỉ định kiểu trả về là SELECT
      }
    );
tours.forEach(item =>{
  if(item["images"]){
  const images = JSON.parse(item["images"]);
  item["image"]=images[0];

  }
  item["price_special"] = parseFloat(item["price_special"])
})
console.log(tours)
    res.render("client/pages/tours/index.pug", {
      tours: tours,
      pageTitle: "Danh sách tour",
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).send("Lỗi server, vui lòng thử lại sau.");
  }
};

export const detailTours = async (req: Request, res: Response) => {
  const { slugTour } = req.params;

  try {
    const tour = await sequelize.query(
      `
        SELECT tours.*, round(price * (1 - discount / 100), 0) AS price_special
        FROM tours
        WHERE tours.slug = :slugTour
          AND tours.deleted = false
          AND tours.status = 'active'
      `,
      {
        replacements: { slugTour },
        type: QueryTypes.SELECT,
      }
    );

    if (tour.length === 0) {
      return res.status(404).send("Tour not found");
    }

    const tourDetail = tour[0];
    if (tourDetail["images"]) {
      const images = JSON.parse(tourDetail["images"]);
      tourDetail["image"] = images;
    }
    tourDetail["price_special"] = parseFloat(tourDetail["price_special"]);
console.log(tourDetail)
    res.render("client/pages/tours/detail.pug", {
      tour: tourDetail,
      pageTitle: "Chi tiết tour",
    });
  } catch (error) {
    console.error("Error fetching tour details:", error);
    res.status(500).send("Lỗi server, vui lòng thử lại sau.");
  }
};
