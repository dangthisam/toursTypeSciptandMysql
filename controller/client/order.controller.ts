
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

export const getOrderSuccess = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;

  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted:false
    },
 
  });

  if (!order) {
    return res.status(404).json({
      code: 404,
      message: "Order not found"
    });
  }

  const dataTour=await OrderItem.findAll({
   where:{
      orderId: order["id"],
      
   },
   raw:true
  })
for (const item of dataTour){
   item["specialPrice"] = item["price"] - (item["price"] * item["discount"] / 100);
   item["totalPrice"]=item["quantity"] * item["specialPrice"];
   const infoTour=await Tour.findOne({
      where:{
         id:item["tourId"],
         deleted:false,
         status:"active"
      },
      raw:true
   })
   console.log(infoTour)
   item["title"] = infoTour["title"];
   item["slug"] = infoTour["slug"];
   item["image"]=JSON.parse(infoTour["images"])[0];
}

order["total_price"] =dataTour.reduce((sum , item) => sum+item["totalPrice"], 0) ;
 console.log("dataTour" , dataTour)
  res.render("client/pages/order/index.pug",{
   titlePage:"Thông tin đơn hàng",
   order: order,
   dataTour: dataTour
  })

};
