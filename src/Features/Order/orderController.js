import OrderRepo from "./orderrepo.js";

export default class OrderController{

    constructor(){
        this.oerderrepo = new OrderRepo();
    }

    async placeorder(req,res,next){
        try {
             const userID = req.userID;
             await this.oerderrepo.placeOrder(userID);
             res.status(200).send("order is created");
        } catch (error) {
          console.log(error);
        }
    }
}