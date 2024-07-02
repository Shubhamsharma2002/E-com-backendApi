import express from 'express';
import UserController from './UserController.js';

const UserRouter = express.Router();


const userController = new UserController();

UserRouter.get('/allusers', userController.getAllUser);
UserRouter.post('/sigin', (req,res)=>{
    userController.SigIn(req,res)
});
UserRouter.post('/signup', (req,res)=>{
    userController.Signup(req,res)
});



export default UserRouter;