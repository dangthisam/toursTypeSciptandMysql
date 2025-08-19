import cloudinary from "../../config/uploadCloudinary";
import { Request, Response, NextFunction } from "express";  
import streamifier from "streamifier"
import dotenv from "dotenv";

dotenv.config();





const streamUpload =(buffer:any)=>{
 
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              {
                 resource_type: "auto", // clooud sẽ hiểu và upload video
              },
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(buffer).pipe(stream);
        });
    

}

const uploadToCloudinary=async (buffer:any)=>{
  const result=await streamUpload(buffer);
  return result["url"]

}



export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req['file'] || !req['file'].buffer) {
      return next();
    }

    const result = await uploadToCloudinary(req['file'].buffer);
    req.body[req['file'].fieldname] = result;

    next(); // Chỉ gọi khi thành công
  } catch (error) {
    console.error('Upload to Cloudinary failed:', error);
    res.status(500).json({ error: 'Upload failed', detail: error });

  }

};



export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {


for (const key in req["files"]) {
req.body[key] = [];

const array = req["files"][key];
for (const item of array) {
try {
const result = await uploadToCloudinary(item.buffer);
req.body[key].push(result);
} catch (error) {
console.log(error);

}


}
}
next();
}
