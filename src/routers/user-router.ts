import express, { Request, Response, NextFunction } from 'express'
import { getAllUsers, findUserById, UpdateOnExistingUser } from '../daos/user-dao';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { authorizationMiddleWare } from '../middlewares/authorizationMiddleware';
import { Users } from '../models/Users';
import { InvalidIdError } from '../errors/InvalidIdError';


export let userRouter = express.Router();



userRouter.use(authenticationMiddleware)


userRouter.get('/', authorizationMiddleWare(['Finance Manager', 'Admin']), async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let getAllusers = await getAllUsers()
        res.json(getAllusers)
    } catch (error) {
        next(error)
    }
})




userRouter.get('/:id', authorizationMiddleWare(['Finance Manager', 'Admin']), async (req:Request, res:Response, next:NextFunction) =>{
    let {id} = req.params
    if(isNaN(+id)){
        res.status(400).send('Id must be a number')
    }else {
        try {
            let userById = await findUserById(+id)
            res.json(userById)
        } catch (error) {
            next(error)
        }
    }
})

// Update User / Allowed Admin

userRouter.patch('/', authorizationMiddleWare(['Admin']), async (req:Request, res:Response, next:NextFunction)=>{
    
        let{
        user_id,
        username,
        password,
        first_name,
        last_name,
        email,
        role
        } = req.body
        if(!user_id || isNaN(req.body.user_id)){
            next(new InvalidIdError())
        }else {
        let updatedUser: Users = {
            user_id,
            username, 
            password, 
            first_name,
            last_name,
            email,
            role
        }
        updatedUser.username= username ||undefined
        updatedUser.password = password || undefined
        updatedUser.first_name = first_name || undefined
        updatedUser.last_name = last_name || undefined
        updatedUser.email = email || undefined
        updatedUser.role = role || undefined

        console.log(updatedUser)
        try {
            let updateResults = await UpdateOnExistingUser(updatedUser)
            res.json(updateResults)
        } catch (error) {
            next(error)
        }
    }
})


