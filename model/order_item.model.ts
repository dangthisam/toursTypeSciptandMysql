import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

const OrderItem = sequelize.define("OrderItem", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
  
  },
  timeStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
} , {
    tableName: "orders_item",
 timestamps:false
});

export default OrderItem;
