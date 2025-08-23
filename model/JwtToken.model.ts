import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

const Token =sequelize.define("Token" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    token:{
        type:DataTypes.STRING(1000),
     allowNull:false,
     
    }
},{
    tableName:"token",
    timestamps:true
})

export default Token;