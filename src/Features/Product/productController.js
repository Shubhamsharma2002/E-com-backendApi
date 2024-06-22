import ProductModel from "./productmodel.js";

export default class Productcontroller{

getAllProduct(req,res){
    let products = ProductModel.GetAll();

    res.status(200).send({products:products});
}

addProduct(req,res){
    const {name,price,sizes} = req.body;
    const newProduct = {
        name,
        price:parseFloat(price),
        sizes : sizes.split(','),
        imgUrl:req.file.filename,
    }
    const newdata = ProductModel.add(newProduct);
    res.status(201).send(newdata);
}

rateProduct(req,res){}
getOneproduct(req,res){}


}