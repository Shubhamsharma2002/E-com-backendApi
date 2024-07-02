import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/Ecomdb"

let client;
export const connectmongodb = ()=>{
     MongoClient.connect(url)
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected -::)");
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    return client.db();
}

export default connectmongodb;