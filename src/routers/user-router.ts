import express, { Request, Response, NextFunction } from 'express'
import { Users } from '../models/Users';
import { InvalidIdError } from '../errors/InvalidIdError';
import { DataNotFoundError } from '../errors/DataNotFoundErrors';

export let userRouter = express.Router();

// get all users
userRouter.get('/', (req:Request, res:Response, next:NextFunction)=>{
    res.json(users);
})

// get users by id
userRouter.get('/:id', (req:Request, res:Response)=>{
    let {id} = req.params;
    if(isNaN(+id)){
        throw InvalidIdError;
    }else {
        let isExist = false;
        for(const user of users){
            if(user.userId === +id){ // + sign convert the id to a number
                res.json(user);
                isExist = true;
            }
        }
        if(!isExist){
            throw new DataNotFoundError;
        }
    }
})
//





export let users:Users[] =[
    {
        userId: 1, // primary key
        username: 'johnnydeep', // not null, unique
        password: 'johnnydeep123', // not null
        firstName: 'Johnny', // not null
        lastName: 'Deep', // not null
        email: 'johnnydeep@gmail.com', // not null
        role: 1 // not null
    },
    {
        userId: 2, // primary key
        username: 'alpacino', // not null, unique
        password: 'alpacino123', // not null
        firstName: 'Al', // not null
        lastName: 'Pacino', // not null
        email: 'alpacino@gmail.com', // not null
        role: 1 // not null
    },
    {
        userId: 3, // primary key
        username: 'angelinajolie', // not null, unique
        password: 'angelinajolie123', // not null
        firstName: 'Angelina', // not null
        lastName: 'Jolie', // not null
        email: 'angelinajolie@gmail.com', // not null
        role: 2 // not null
    }
]