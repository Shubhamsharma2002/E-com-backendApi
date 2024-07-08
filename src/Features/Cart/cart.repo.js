import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/db.js";

export default class Cartitemrepo{

    constructor(){
        this.collection = "cartItems"; 
      }

      async  add(productID, userID, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getnextCounter(db);
            console.log(id);
    
            await collection.updateOne(
                {
                    productID: new ObjectId(productID), // Convert to ObjectId if necessary
                    userID: new ObjectId(userID) // Convert to ObjectId if necessary
                },
                {
                    $setOnInsert: { _id: id },
                    $inc: { quantity: quantity }
                },
                { upsert: true }
            );
    
        } catch (err) {
            console.log(err);
            throw new Error('Something went wrong');
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

      async  getnextCounter(db) {
        const resultDocument = await db.collection("counter").findOneAndUpdate(
            { _id: 'cartItemId' },
            { $inc: { value: 1 } },
            { returnDocument: 'after' }
        );
    
        console.log(resultDocument);
    
        // Check if resultDocument exists and has a value field
        if (resultDocument && resultDocument.value) {
            return resultDocument.value; // Assuming 'value' is the field holding the counter value
        } else {
            throw new Error("Could not retrieve counter value");
        }
    }
    

}