import Cartitemsmodel from "./cartModel.js";

export class CartItemsController{
    add(req,res){
        const {productID, quantity} = req.query;
        const userID = req.userID;

        const result =  Cartitemsmodel.add(productID,userID,quantity);
         if(!result){
            res.status(400).send("something went wrong");
         }else{
            console.log(result)
            res.status(201).send('cart item updated')
         }
        

    }

    get(req,res){

        const userID = req.userID;
        const items = Cartitemsmodel.get(userID);

        if(!items){
         return res.status(401).send('no such item found related to the user');
        }else{
          return res.status(200).send(items);
        }
    }

    delete(req,res){
        const userID = req.userID;
        const cartitemID = req.params.id;
        const error = Cartitemsmodel.delete(
            cartitemID,
            userID
        );
        if(error){
            return res.status(400).send(error);
        }else{
            res.status(200).send('item deleted suceesfully');
        }
    }
}