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
}