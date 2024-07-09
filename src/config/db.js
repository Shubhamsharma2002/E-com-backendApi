import { MongoClient } from "mongodb";

const url = process.env.uri;


let client;
export const connectmongodb = ()=>{
     MongoClient.connect(url)
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected -::)");
            createCounter(client.db());
            createindex(client.db())
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    return client.db();
}

const createCounter = async(db)=>{
    const existingCounter=await db.collection("counter").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counter").insertOne({_id:'cartItemId', value:0});
    }
}


const createindex = async(db) =>{
    try {
        await db.collection("product").createIndex({price:1})
    } catch (err) {
        console.log(err);
    }
    console.log('index are created');
}