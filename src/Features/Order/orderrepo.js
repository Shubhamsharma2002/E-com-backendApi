import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/db.js";
import orderModel from "./orderModel.js";


export default class OrderRepo{
    constructor(){
        this.collection = "orders";
    }

    
    async placeOrder(userID){
        const client = getClient();
        const session = client.startSession();
        try{
        
        const db = getDB();
        session.startTransaction();
        // 1. Get cartitems and calculate total amount.
        const items = await this.getTotalAmount(userID, session);
        const finalTotalAmount = items.reduce((acc, item)=>acc+item.totalAmount, 0)
        console.log(finalTotalAmount);
        
        // 2. Create an order record.
        const newOrder = new orderModel(new ObjectId(userID), finalTotalAmount, new Date());
        await db.collection(this.collection).insertOne(newOrder, {session});
        
        // 3. Reduce the stock.
        for(let item of items){
            await db.collection("product").updateOne(
                {_id: item.productID},
                {$inc:{stock: -item.quantity}},{session}
            )
        }
        // throw new Error("Something is wrong in placeOrder");
        // 4. Clear the cart items.
        await db.collection("cartItems").deleteMany({
            userID: new ObjectId(userID)
        },{session});
        session.commitTransaction();
        session.endSession();
        return;
        }catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new Error("Something went wrong with database", 500);    
        }
    }
    async getTotalAmount(userID){
        const db = getDB();
        const items = await db.collection("cartItems").aggregate([
            // 1. Get cart items for the user
            {
                $match:{userID: new ObjectId(userID)}
            },
            // 2. Get the products form products collection.
            {
                $lookup:{
                    from:"product",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            // 3. Unwind the productinfo.
            {
                $unwind:"$productInfo"
            },
            // 4. Calculate totalAmount for each cartitems.
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price", "$quantity"]
                    }
                }
            }
        ]).toArray();
        console.log(items)
        return items;
        
    }
}