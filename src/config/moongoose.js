import mongoose from "mongoose";
import { categorySchema } from "../Features/Product/categorySchema.js";


const url = process.env.uri;

export const connectionUsingMoongose = async() =>{
        try {
            await mongoose.connect(url);
            console.log("conncetion stablish using moongose")
            addCategory();
        } catch (error) {
            console.log(error);
            throw new Error("getting error to coonect with db")   
        }
}

async function addCategory(){
    const CategoryModel = mongoose.model('Category', categorySchema);
    const categories = await CategoryModel.find();
    if(!categories){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'}, {name:'Electronic'}]);

    }
    console.log("category added")
}