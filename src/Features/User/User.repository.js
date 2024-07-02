import { getDB } from "../../config/db.js";

export default class Userrepo{


     async Signup(newUser){
        // 1 get db 
    
        try {
        const db = getDB();
        const collection = db.collection("user");
       
           await collection.insertOne(newUser);
            return newUser;
        } catch (error) {
             throw new Error("user not signup")
        }   
       }


       async Sigin(email,password){
        // 1 get db 
    
        try {
        const db = getDB();
        const collection = db.collection("user");
       
        return await collection.findOne({email,password});
            
        } catch (error) {
             throw new Error("user not signup")
        }   
       }

       async findbyemail(email){
        // 1 get db 
    
        try {
        const db = getDB();
        const collection = db.collection("user");
       
        return await collection.findOne({email});
            
        } catch (error) {
             throw new Error("user not signup")
        }   
       }
}