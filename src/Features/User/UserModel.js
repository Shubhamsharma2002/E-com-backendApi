export default class UserModel{
   constructor(name,email,password,type,id){
          this.name = name;
          this.email = email;
          this.password = password;
          this.type = type;
          this._id = id;
   }
   
   static getAll(){
        return users;
   }
}


var users = [
   {
    id: 1,
    name : 'shubhamAdmin',
    email : 'admin@123',
    password:'1234@admin',
    type: 'admin'
   },
   {
    id:2,
    name : 'shubhamuser',
    email : 'user@123',
    password:'1234@user',
    type: 'user'
   },
   {
    id:3,
    name : 'shubhamuser',
    email : 'user@123',
    password:'1234@user',
    type: 'user'
   }
]