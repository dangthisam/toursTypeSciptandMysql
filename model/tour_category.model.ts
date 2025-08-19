import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Tour from "./tours.model";

const TourCategory=sequelize.define("TourCategory" , {
    tour_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
            model:"tours",
            key:"id"
        }
    },
    category_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
        model:"categories",
        key:"id"
        }
    }
},{
    tableName:"tours_categories",
    timestamps:false
})

export default TourCategory;