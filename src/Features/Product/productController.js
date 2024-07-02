import Productrepo from "./product.repository.js";
import ProductModel from "./productmodel.js";

export default class Productcontroller{
constructor(){
    this.productrepo = new Productrepo();
}
async getAllProduct(req,res){
    let products = await this.productrepo.getAll();

    res.status(200).send({products:products});
}

async addProduct(req,res){
    const {name,price,sizes} = req.body;
    const newProduct = new ProductModel(name,null,parseFloat(price),req.file.filename,null,sizes.split(','));
    const newdata = await this.productrepo.add(newProduct);
    res.status(201).send(newdata);
}

rateProduct(req,res){
     const userId = req.query.userId;
     const productId = req.query.productId;
     const rating = req.query.rating;

     const error = ProductModel.rate(
        userId,productId,rating
     );

     if(error){
        return res.status(400).send(error);
     }else{
        return res.status(200).send('rating added')
     }
}
async getOneproduct(req,res){
  
    const id = req.params.id;
    const product =  await  this.productrepo.get(id);
    if(!product){
        res.status(500).send("product not found");
    } else{
        return res.status(200).send(product);
    }
}

filterProducts(req, res) {
    console.log("sjgf")
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    
  const data = ProductModel.filter(
    minPrice,maxPrice,category
  )
    res.status(201).send(data);
}





}