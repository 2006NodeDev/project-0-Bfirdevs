import express, { Request, Response, NextFunction } from 'express'
import { InvalidIdError } from '../errors/InvalidIdError';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
//import { authorizationMiddleWare } from '../middlewares/authorizationMiddleware';
import { getAllUsers, getUserById, UpdateExistingUser } from '../daos/user-dao';
import { authorizationMiddleWare } from '../middlewares/authorizationMiddleware';
import { Users } from '../models/Users';


export let userRouter = express.Router();
userRouter.use(authenticationMiddleware)

// get all users

userRouter.get('/', authorizationMiddleWare(['Admin']) ,async (req:Request, res:Response, next:NextFunction)=>{
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
userRouter.get('/:id', authorizationMiddleWare(['Finance Manager']) ,async(req:Request, res:Response, next: NextFunction)=>{
    let {id} = req.params;
    if(isNaN(+id)){
        next (new InvalidIdError());
    }else {
       try {
        let users = await getUserById(+id)
        res.json(users);
       } catch (error) {
           next(error);
       }
    }
})


// Update User (Patch, Role:Admin)

userRouter.patch('/', authorizationMiddleWare(['admin']), async (req:Request, res:Response, next:NextFunction)=>{
    let {
        user_id,
        username,
        password,
        firstName,
        lastName,
        email,
        role
    } = req.body 
    if(isNaN(+user_id)){
        throw new InvalidIdError
    } else {
        let UpdatedUser: Users = {
            user_id,
            username,
            password,
            firstName,
            lastName,
            email,
            role
        }
        // not sure about this undefined
        UpdatedUser.username = username || undefined
        UpdatedUser.password = password || undefined
        UpdatedUser.firstName = firstName || undefined
        UpdatedUser.lastName = lastName || undefined
        UpdatedUser.email = email || undefined
        UpdatedUser.role = role || undefined
        try {
            let result = await UpdateExistingUser(UpdatedUser)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    
})