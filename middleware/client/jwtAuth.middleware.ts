// Middleware for token verification
import jwt from "jsonwebtoken";
import jwtToken from "../../model/JwtToken.model"
import { Request, Response, NextFunction } from "express";
const secretKeyJWT =process.env.JWT_SECRET_KEY;
 export const authenticateToken =async  (req:Request, res:Response, next:NextFunction) => {
  const token =req.cookies.accessToken;

  if (!token) return res.status(401).send('Token required');

  jwt.verify(token, secretKeyJWT, (err:Error, user:any) => {
    if (err) return res.status(403).send('Invalid or expired token');
    req['user'] = user;
    next();
  });
};





