import { Request, Response } from "express";
import md5 from "md5";
import User from "../../model/user.model";
import  jwt from "jsonwebtoken"
const secretKeyJWT =process.env.JWT_SECRET_KEY
export const userRegister=async (req:Request, res:Response) =>{

    const {email , password, username}=req.body;
    const exitsEmail=await User.findAll({
        where:{
            email:email
        }
    })
    if(exitsEmail){
        res.json({
            code:400,
            message:"email exits"
        })
    }
    const dataUser={
        email:email,
        password:md5(password),
        username:username
    }

const newUser=    await User.create(dataUser)

    res.json({
        code:201,
        message:"user created",
        data:newUser
    })
}

export const userLogin =async(req:Request, res:Response)=>{

    const {email, password} =req.body;
    const user =await User.findOne({
        where:{
            email:email
        }
    });
    if(!user){
        res.json({
            code:401,
            message:"Invalid credentials"
        })
    }
    console.log(user["password"])
 if(user["password"]!=md5(password)){
    res.json({
        code:401,
        message:"invalid password"
    })
 }

  const token = jwt.sign({ userId: user["username"] }, secretKeyJWT, { expiresIn: '1h' });

  res.status(200).send({token})
}