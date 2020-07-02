import express, { Request, Response, NextFunction } from 'express'

import { getAllUsers, findUserById } from '../daos/user-dao';


export let userRouter = express.Router();



//userRouter.use(authenticationMiddleware)

// get all authorizationMiddleWare(['Admin']
userRouter.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let users = await getAllUsers()
        res.json(users)
    } catch (error) {
        next(error)
    }
  
})




// get by id
userRouter.get('/:id', async (req:Request, res:Response, next:NextFunction) =>{
    let {id} = req.params
    if(isNaN(+id)){
        res.status(400).send('Id should be a number')
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
userRouter.get('/:id', authorizationMiddleware(['admin','finance-manager','Employee']), async (req:Request, res:Response, next:NextFunction) => {
    let {id} = req.params;
    if(isNaN(+id)){
        next(new UserIdInputError)
    }
    else if(req.session.user.role === "user" && req.session.user.userId !== +id){
        next(new UnauthorizedEndPointError)
    }
    else{
        try{
            let user = await getUserById(+id)
            res.json(user)
        } catch (e){
            next(e)
        }
    }
}
*/



