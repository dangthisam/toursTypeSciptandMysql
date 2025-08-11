import { DataTypes } from "sequelize";   
import sequelize from "../config/connectDB";


const Tour = sequelize.define('Tour', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    code:{
        type: DataTypes.STRING(10),
        allowNull: false // khong duoc de trong
    },
    images:{
        type: DataTypes.TEXT("long"),
        allowNull: true // co the de trong
    },
    price:{
        type: DataTypes.INTEGER,
       
    },
    discount:{
        type: DataTypes.INTEGER,
     
    },
    information:{
        type: DataTypes.TEXT("long"),
      
    },
    schedule:{
        type:DataTypes.TEXT("long")
    },
    timeStart:{
        type:DataTypes.DATE
    },
   stock:{
    type:DataTypes.INTEGER
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

   }
},{
    tableName:"tours",
    timestamps:true
});

export default Tour;
