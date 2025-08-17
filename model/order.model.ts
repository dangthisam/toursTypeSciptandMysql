import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  code:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fullName:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone:{
    type  : DataTypes.STRING(20),
    allowNull: false
  },
  note:{
    type: DataTypes.TEXT("long"),
   
  },
  status:{
    type: DataTypes.STRING(50),
   
  },
  deleted:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt:{
    type: DataTypes.DATE
  }
},{
    tableName: "orders",
    timestamps: true
});

export default Order;
