import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js";

export default class Cartitemrepo{

    constructor(){
        this.collection = "cartitems"; 
      }

      async add(productID,userID,quantity){
          try{
            const db = getDB();
            const collection = db.collection(this.collection);
            // this also check is item is alredy in cart so upadte the item 
          await collection.updateOne({productID:new ObjectId(productID),userID:new ObjectId(userID)},
              {$inc:{
                quantity:quantity
              }},
              {upsert:true}
        );

          }catch(err){
             console.log(err);
             throw new Error('something went wrong');
          }
          
      }

      async get(userID){
           try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({userID:new ObjectId(userID)}).toArray();
           }catch(err){
               console.log(err);
               throw new Error("user not find")
           }
      }

      async delete(userID,cartitemID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result =  await collection.deleteOne({_id:new ObjectId(cartitemID), userID: new ObjectId(userID)});
            return result.deletedCount>0;
           }catch(err){
               console.log(err);
               throw new Error("user not find")
           }
      }

}