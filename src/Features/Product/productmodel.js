export default class ProductModel{

 constructor(
    id, 
    name, 
    desc,
    imgUrl,
    category,
    price,
    sizes)
    {
    this.id = id;
    this.name =name;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.category = category;
    this.price = price;
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