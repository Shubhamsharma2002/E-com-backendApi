import ProductModel from "./productmodel.js";

export default class Productcontroller{

getAllProduct(req,res){
    let products = ProductModel.GetAll();

    res.status(200).send({products:products});
}

addProduct(req,res){}

rateProduct(req,res){}
getOneproduct(req,res){}


}