import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/Ecomdb"

const connectmongodb = () =>{
    MongoClient.connect(url).then(client =>{
        console.log("connect db ::)")
    }).catch(err=>{
        console.log(err);
    })
}

export default connectmongodb;