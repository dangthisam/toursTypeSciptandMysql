// Middleware for token verification
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const secretKeyJWT =process.env.JWT_SECRET_KEY;
 export const authenticateToken =async  (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Token required');

  jwt.verify(token, secretKeyJWT, (err:Error, user:any) => {
    if (err) return res.status(403).send('Invalid or expired token');
    req['user'] = user;
    next();
  });
};





