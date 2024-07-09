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

async rateProduct(req,res){
    
        const userID = req.userID;
        console.log(userID)
        const productId = req.body.productId;
        const rating = req.body.rating;
   
        const error =  await this.productrepo.rate(
           userID,productId,rating
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

async filterProducts(req, res) {
    console.log("sjgf")
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    
  const data = await this.productrepo.filter(
    minPrice,maxPrice,category
  )
    res.status(201).send(data);
}




  async getAveragePrice(req,res){
    try {
        const result = await this.productrepo.averageProductpricePerCategory();
        return res.status(200).send(result);
    } catch (error) {
           console.log(error);
           throw new Error("something went wrong we will handle soon ")
    }
  }
}