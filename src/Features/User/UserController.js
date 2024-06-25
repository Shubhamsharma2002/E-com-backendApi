import UserModel from "./UserModel.js";

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