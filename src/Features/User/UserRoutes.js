import express from 'express';
import UserController from './UserController.js';

const UserRouter = express.Router();


const userController = new UserController();

// All the paths to controller methods.

UserRouter.post('/signup', (req, res)=>{
    userController.signUp(req, res)
});
UserRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});



export default UserRouter;