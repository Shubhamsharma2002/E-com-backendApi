import Cartitemrepo from "./cart.repo.js";
import Cartitemsmodel from "./cartModel.js";

export class CartItemsController{

      constructor(){
        this.cartItemRepo = new Cartitemrepo();
      }

   async add(req,res){
    try{
        const {productID, quantity} = req.body;
        const userID = req.userID;

         await this.cartItemRepo.add(productID,userID,quantity);
         res.status(200).send("cart is updated ");
    }catch(err){
        console.log(err);
        res.status(401).send("item is not added in cart")
    }
        
        
        

    }

   async get(req,res){
         try{
            const userID = req.userID;
            const items = await  this.cartItemRepo.get(userID);   
            return res.status(200).send(items);
         }catch(err){
             console.log(err);
             throw new Error("something went wrong")
         }
        
    
    }

    async delete(req,res){
        const userID = req.userID;
        const cartitemID = req.params.id;
        const isdeleted =  await this.cartItemRepo.delete(
            userID,
            cartitemID,
     
        );
        if(!isdeleted){
            return res.status(400).send('item not found');
        }else{
            res.status(200).send('item deleted suceesfully');
        }
    }
}