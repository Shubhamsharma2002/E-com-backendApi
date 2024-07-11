import mongoose from "mongoose";


const url = process.env.uri;

export const connectionUsingMoongose = async() =>{
        try {
            await mongoose.connect(url);
            console.log("conncetion stablish using moongose")
        } catch (error) {
            console.log(error);
            throw new Error("getting error to coonect with db")   
        }
}