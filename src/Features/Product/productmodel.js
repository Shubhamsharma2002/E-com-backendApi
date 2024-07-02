import UserModel from "../User/UserModel.js";
export default class ProductModel{

 constructor(
    
    name, 
    desc,
    price,
    imgUrl,
    category,sizes,id)
    {
    this._id = id;
    this.name =name;
    this.desc = desc;
    this.price = price;
    this.imgUrl = imgUrl;
    this.category = category;
    
    this.sizes = sizes;
    
 }

 static Get(id){
  const product = products.find((i) => i.id == id);
  return product;
 }
 static GetAll (){
    return products;
 }

 static add(product){
  product.id = products.length+1;
  products.push(product);
  return product;
 }

 static filter(minPrice, maxPrice, category){
  const result = products.filter((product)=>{
    return(
    (!minPrice || 
      product.price >= minPrice) &&
    (!maxPrice || 
      product.price <= maxPrice) &&
    (!category || 
      product.category == category)
    );
  });
  return result;
}

static rate(userID,productID,rating){
    // check user is valid or not 

    const user = UserModel.getAll().find(
      (u) => u.id == userID
    );
    if(!user){
       return 'user not found!';
    }

    // valid product 

    const product = products.find((P) => P.id == productID);
    if(!product){
       return 'product not found !'
    }


    // check if there are any rating and if not then add rating array

    if(!product.ratings){
      product.ratings =[];
      product.ratings.push({
        userID:userID,
        rating:rating,
      });
    }else{
       const existingratingIndex = product.ratings.findIndex(
        (r) => r.userID == userID
       );

       if(existingratingIndex>=0){
        product.ratings[existingratingIndex] ={
          userID:userID,
          rating:rating,
        }
       }else{
        product.ratings.push({
          userID:userID,
          rating:rating,
        })
       }
    }

}

}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'category 1',
      ['M','XL','S'],
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'category 2',
      ['M','XL','S'],
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'category 3',
      ['M','XL','S'],
    ),
  ]