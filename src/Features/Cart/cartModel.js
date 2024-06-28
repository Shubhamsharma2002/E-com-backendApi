export default class Cartitemsmodel{
    constructor(productID,userID, quantity,id){
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }

  
    static add(productID,userID,quantity){
        const cartitem = new Cartitemsmodel(
            productID,
            userID,
            quantity
        )

        cartitem.id = cartitems.length+1;
        cartitems.push(cartitem);
        return cartitem;
    }

    static get(userID){
          return cartitems.filter(
            (i) => i.userID == userID
          )
    }

    static delete(cartitemID,userID){
        const cartitemIndex = cartitems.findIndex(
            (i) => i.id == cartitemID && i.userID == userID
        );

        if(cartitemIndex == -1){
            return 'item not found';
        }else{
            cartitems.splice(cartitemIndex,1);
        }
    }
}

var cartitems = [
    new Cartitemsmodel(1,2,1,1),
    new Cartitemsmodel(2,2,5,2),
    new Cartitemsmodel(3,2,4,3),
   
]