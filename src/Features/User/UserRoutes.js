import express from 'express';
import UserController from './UserController.js';

const UserRouter = express.Router();


const userController = new UserController();


UserRouter.post('/sigin', userController.SigIn);
UserRouter.post('/signup', userController.Signup);



export default UserRouter;