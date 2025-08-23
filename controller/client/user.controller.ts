import { Request, Response } from "express";
import md5 from "md5";
import User from "../../model/user.model";
import  jwt from "jsonwebtoken"
const secretKeyJWT =process.env.JWT_SECRET_KEY
const secretRefreshJWT=process.env.REFRESH_SECRET_KEY
export const userRegister=async (req:Request, res:Response) =>{
    const {email , password, username}=req.body;
    const exitsEmail=await User.findOne({
        where:{
            email:email
        }
    });
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


// Register
export const formRegister =async (req:Request, res:Response)=>{
    res.render("client/pages/user/register.pug",{
        titlePage:"Dang ky tai khoan"
    })
}


// [POST]  /user/login

export const userLogin =async(req:Request, res:Response)=>{
console.log(req.body)
    const {email, password} =req.body;
    const user =await User.findOne({
        where:{
            email:email
        }
    });
    if(!user){
    return     res.json({
            code:401,
            message:"Invalid credentials"
        })
    }
    console.log(user["password"])
    console.log(md5(password))
 if(user["password"]!==md5(req.body.password)){
    return  res.json({
        code:401,
        message:"invalid password"
    })
   
 }

  else{
    const token = jwt.sign({ userId: user["username"] }, secretKeyJWT, { expiresIn: '2m' });
  const refreshToken=jwt.sign({userid:user["username"]} , secretRefreshJWT ,{expiresIn:'1d'})
res.cookie("accessToken" , token,{
    httpOnly:true,
    sameSite:"none",
    secure:true,
    maxAge:2*60*1000
}
)
  res.cookie("jwt" , refreshToken ,{
    httpOnly:true, //dam bao cookie khong the truy cap bang js tren trinh duyet
    sameSite:"none",//: cookie chỉ được gửi qua kết nối HTTPS và cho phép gửi trong yêu cầu cross-site (cần thiết khi frontend và backend khác domain).
    secure:true,
    maxAge:24*60*60*100
  })
  res.status(200).send({token , refreshToken})
  }
}

export const refreshToken =async(req:Request,res:Response) =>{
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
    if(req.cookies.jwt){
        const refreshToken=req.cookies.jwt;
        console.log(refreshToken)
        // Verifying refresh token
        jwt.verify(refreshToken,secretRefreshJWT,
            (err:Error, decoded) => {
                if (err) {

                    // Wrong Refesh Token
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token we send a new access token
                    const accessToken = jwt.sign({
                        username:user["username"],
                        email: user["email"]
                    }, secretKeyJWT, {
                        expiresIn: '10m'
                    });
                    return res.status(201).json(accessToken)
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
    }

//[GET]  /user/login

export const formLogin =async(req:Request , res:Response)=>{
    res.render("client/pages/user/login.pug",{
        titlePage:"Login"
    })
}