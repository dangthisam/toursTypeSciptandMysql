
import { Request , Response } from "express";
import Order from "../../model/order.model";
import OrderItem from "../../model/order_item.model"
import {generateOrderCode} from "../../helps/generate"
import Tour from "../../model/tours.model";
 export const order =async  (req: Request, res: Response) => {
 const data = req.body;
 console.log("data", data);
 const dataOrder:{
    code?: string;
    fullName?: string;
    phone?: string;
    note?: string;
    status?: string;
    deleted?: boolean;
 } = {
   code: "",
   fullName: data.info.fullName,
   phone: data.info.phone,
   note: data.info.note,
   status:"initial"
 }
  const order=await Order.create(dataOrder);

  const orderId= order.dataValues.id;
  const code=generateOrderCode(parseInt(orderId));
    await Order.update({
       code:code
    } , {
        where:{ id: orderId }
    });
// save data to table order_items

for (const item of data.cart){
 const dataItem={
    orderId:orderId,
    tourId:item.tourId,
    quantity:item.quantity,
 }
 const infoTour=await Tour.findOne({
    where:{
        id:item.tourId,
        deleted:false,
        status:"active"
    },
    raw:true
 })
 console.log("infoTour", infoTour)

 dataItem['price'] =infoTour["price"];
 dataItem["discount"]=infoTour["discount"];
 dataItem["timeStart"]=infoTour["timeStart"];

const orderItem=await OrderItem.create(dataItem);
console.log(orderItem);
}
  res.json({
    code:200,
    message:"Order created successfully",
    orderCode: code
  })
};

