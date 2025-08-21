import {DataTypes}  from "sequelize";
import sequelize from "../config/connectDB";

const User =sequelize.define("User" , {
    id:{
        type:DataTypes.NUMBER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    password:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    username:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(40),
        allowNull:false
    },

},{
    tableName:"user",
    timestamps:false
})

export default User;