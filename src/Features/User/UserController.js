import Jwt from 'jsonwebtoken';
import UserModel from "./UserModel.js";
import Userrepo from './User.repository.js';
import bcrypt from 'bcrypt'


// manual Authentication
/*
export default class UserController{


    Signup(req,res){

        const{name,email,password,type} = req.body;
       const user =  UserModel.Signup(name,email,password,type);
       console.log(user);
       res.status(201).send(user);
    }

    SigIn(req,res){

        const result = UserModel.Sigin(req.body.email,req.body.password);
        if(!result){
            return res.status(400).send("invalid credential");
        }else{
           return res.status(201).send('login sucessfully');
        }
    }


    getAllUser(req,res){
        const data = UserModel.getAll();

        res.status(201).send(data);
    }
}
    */

// Authentication using JWT 

export default class UserController{
    constructor(){
        this.userrepo = new Userrepo();
    }

   async Signup(req,res){

        const{name,email,password,type} = req.body;
        const hashedpssword = await bcrypt.hash(password,12);
       const user =   new UserModel(name,email,hashedpssword,type);
       await this.userrepo.Signup(user);
       console.log(user);
       res.status(201).send(user);
    }

    async SigIn(req, res, next) {
        try{
          // 1. Find user by email.
          const user = await this.userrepo.findbyemail(req.body.email);
          if(!user){
            return res
            .status(400)
            .send('Incorrect Credentials');
          } else {
            // 2. Compare password password with hashed password.
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
              // 3. Create token.
             
              const token = Jwt.sign({userID:result.id, email:result.email},process.env.scerete
                ,{expiresIn:'1h'})
             
          // 4. Send token.
          return res.status(200).send(token);
            } else {
              return res
            .status(400)
            .send('Incorrect Credentials');
            }
          }
      } catch(err){
          console.log(err);
          return res.status(200).send("Something went wrong");
        }
      }


    getAllUser(req,res){
        const data = UserModel.getAll();

        res.status(201).send(data);
    }
}