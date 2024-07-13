import express from 'express';
import UserController from './UserController.js';
import jwtAuth from '../../Middleware/JwtAuthMiddleware.js';

const UserRouter = express.Router();


const userController = new UserController();

// All the paths to controller methods.

UserRouter.post('/signup', (req, res)=>{
    userController.signUp(req, res)
});
UserRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});

UserRouter.put('/resetPassword', jwtAuth,(req, res)=>{
    userController.resetPassword(req, res)
});


export default UserRouter;