export default class UserModel{
   constructor(name,email,password,type,id){
          this.name = name;
          this.email = email;
          this.password = password;
          this.type = type;
          this.id = id;
   }
   static Signup(name,email,password,type){
       const newUser = new UserModel(
        name,email,password,type
       );
       newUser.id = users.length+1;
       users.push(newUser);
       return newUser;
   }

   static Sigin(email,password){
       const user = users.find(
        (u) => u.email == email && u.password == password
       );

       return user;
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