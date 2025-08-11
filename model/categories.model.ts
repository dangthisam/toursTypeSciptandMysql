import { DataTypes } from "sequelize";

import sequelize from "../config/connectDB";

const Category = sequelize.define("Category", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
     status:{
    type:DataTypes.STRING
   },
   position:{
    type:DataTypes.INTEGER
   },
   slug:{
       type:DataTypes.STRING(255),
    allowNull: false
   },
   deleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
   },
   deletedAt:{
    type:DataTypes.DATE

   },
}, {
    tableName: "categories",
    timestamps:true,

});

export default Category;
