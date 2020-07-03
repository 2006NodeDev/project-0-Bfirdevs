import express, { Request, Response, NextFunction } from 'express'

import { getAllUsers, findUserById } from '../daos/user-dao';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { authorizationMiddleWare } from '../middlewares/authorizationMiddleware';


export let userRouter = express.Router();



userRouter.use(authenticationMiddleware)

// get all authorizationMiddleWare(['Admin']
userRouter.get('/', authorizationMiddleWare(['Admin', 'Finance Manager']), async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let getAllusers = await getAllUsers()
        res.json(getAllusers)
    } catch (error) {
        next(error)
    }
})




userRouter.get('/:id', authorizationMiddleWare(['Admin', 'Finance Manager']), async (req:Request, res:Response, next:NextFunction) =>{
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

/*
// Update User 
userRouter.patch('/', authorizationMiddleWare(['Admin']), async (req:Request, res:Response, next:NextFunction)=>{
    let id = req.body.user_id
    console.log(req.body);
    console.log(id)
    if(isNaN(+id)){
        next(new InvalidIdError)
    }else {
        let user: Users = {
            user_id: req.body.user_id,
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: req.body.role
        }
        console.log(user)
        try {
            let updatedUser = await patchUser(user)
            res.json(updatedUser)
        } catch (error) {
            next(error)
        }
    }
})

*/