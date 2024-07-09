import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js";

export default class Productrepo{
  constructor(){
    this.collection = "product"; 
  }
  async add(newProduct){
    try {
        const db = getDB();
        const collection = db.collection(this.collection);
       
           await collection.insertOne(newProduct);
            return newProduct;
        } catch (error) {
             throw new Error("getting error to add product")
        } 
  }
 async get(id){
    try {
        const db = getDB();
        const collection = db.collection(this.collection);
       
        const data =  await collection.findOne({_id: new ObjectId(id)});
        console.log(data);
        return data;
            
        } catch (error) {
             throw new Error("product not found with specific id")
        } 
 }
async getAll(){
    try {
        const db = getDB();
        const coll = db.collection(this.collection);
       
        const pro =  await coll.find().toArray();
        console.log(pro);
        return pro;
            
        } catch (error) {
             throw new Error("product not found")
        } 
}

async filter(minPrice, maxPrice, category){
       

     try {
          const db = getDB();
          const coll = db.collection(this.collection);
          let fillterExpression = {};
          if(minPrice){
               fillterExpression.price = {$gte:parseFloat(minPrice)}
          }
          if(maxPrice){
               fillterExpression.price = {...fillterExpression.price,$lte:parseFloat(maxPrice)}
          }
          if(category){
               fillterExpression.category = category;
          }

         return coll.find(fillterExpression).toArray();

     } catch (error) {
          throw new Error("product not found")
     }
}

// async rate(userID, productID, rating) {
//      try {
//          const db = getDB(); // Assuming getDB() function retrieves the MongoDB client
//          const coll = db.collection(this.collection); // Assuming this.collection is the collection name
 
//          // Find the product by productID
//          const product = await coll.findOne({ _id: new ObjectId(productID) });
 
//          // Find the user's existing rating if it exists
//          const userRating = product?.ratings?.find(r => r.userID == userID);
 
//          if (userRating) {
//              // Update the existing rating
//              await coll.updateOne(
//                  {
//                      _id: new ObjectId(productID),
//                      "ratings.userID": userID // Assuming userID is not an ObjectId
//                  },
//                  {
//                      $set: {
//                          "ratings.$.rating": rating
//                      }
//                  }
//              );
//          } else {
//              // Add a new rating for the user
//              await coll.updateOne(
//                  {
//                      _id: new ObjectId(productID)
//                  },
//                  {
//                      $push: {
//                          ratings: { userID, rating }
//                      }
//                  }
//              );
//          }
         
//      } catch (error) {
//          throw new Error("Error in rating: " + error.message);
//      }




async rate(userID, productID, rating) {
          try {
              const db = getDB(); // Assuming getDB() function retrieves the MongoDB client
              const coll = db.collection(this.collection); // Assuming this.collection is the collection name
      
      
              
              await coll.updateOne(
               {
                   _id: new ObjectId(productID)
               },
               {
                   $pull: {
                       ratings: { userID}
                   }
               }
           );     
             
                  await coll.updateOne(
                      {
                          _id: new ObjectId(productID)
                      },
                      {
                          $push: {
                              ratings: { userID, rating }
                          }
                      }
                  );
              
              
          } catch (error) {
              throw new Error("Error in rating: ");
          }
     
 }
 

 async averageProductpricePerCategory(){
    try {
        const db = getDB();
        return await db.collection(this.collection).aggregate([
            {
                $group:{
                    _id:"$category",
                    averagePrice:{$avg:"$price"}
                }
            }
        ]).toArray();
        
    } catch (error) {
        throw new Error("Error in rating: ");
    }
 }
}

