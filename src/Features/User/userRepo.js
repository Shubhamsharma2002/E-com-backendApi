import mongoose from "mongoose";

import {UserSchema} from './UserSchema.js';


const UserModel = mongoose.model('User', UserSchema)

export default class UserRepository{

    async signUp(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }else{
                throw new Error("Something went wrong with database", 500);
            }
            
        }
    }

    async signIn(email, password){
        try{
           return await UserModel.findOne({email, password});
        }
        catch(err){
            console.log(err);
            throw new Error("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new Error("Something went wrong with database", 500);
      }
      }

      async resetpassword(userID,newPassword){
        try {
            let user = await UserModel.findById(userID);

            if(user){
                user.password = newPassword;
                user.save();
            }else{
                throw new Error("user not found")
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("something went wrong")
        }
      }
}