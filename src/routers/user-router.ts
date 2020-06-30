import express, { Request, Response, NextFunction } from 'express'
import { InvalidIdError } from '../errors/InvalidIdError';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
//import { authorizationMiddleWare } from '../middlewares/authorizationMiddleware';
import { getAllUsers } from '../daos/user-dao';


export let userRouter = express.Router();
userRouter.use(authenticationMiddleware)

// get all users
//userRouter.get('/', authorizationMiddleWare(['Finance Manager']), (req:Request, res:Response, next:NextFunction)=>{
userRouter.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    //res.json(users);
    // interacting database is asynchronous
    // which means getAlluser function returns a promise
    try {
        let allUsers = getAllUsers()
        res.json(allUsers)
    } catch (error) {
        next(error)
    }
})

//userRouter.get('/:id',authorizationMiddleWare(['Admin', 'Finance Manager']) ,(req:Request, res:Response)=>{
// get users by id
userRouter.get('/:id', async(req:Request, res:Response, next: NextFunction)=>{
    let {id} = req.params;
    if(isNaN(+id)){
        next (new InvalidIdError());
    }else {
       try {
        let users = await findUserById(+id)
        res.json(users);
       } catch (error) {
           next(error);
       }
    }
})


