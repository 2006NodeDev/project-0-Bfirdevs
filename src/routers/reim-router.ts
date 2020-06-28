import express, { Request, Response, NextFunction } from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { ReimIdInputError } from '../errors/ReimIdInputError'
import { ReimNotFoundError } from '../errors/ReimNotFoundErrors'

//import express from 'express'
//import { Reimbursement } from './models/Reimbursement';


export let reimRouter = express.Router()

reimRouter.get('/',(req:Request, res:Response)=>{
    res.json(reim)
})

reimRouter.get('/:id', (req:Request, res:Response)=>{
    let {id} = req.params
    if(isNaN(+id)){
        throw new ReimIdInputError
    }else {
        let found = false; 
        for (const reim of Reimbursement ){
            if(reim.bookId === +id ){
                found = true;
                res.json(reim);
            }
        }
        if(!found){
            throw new ReimNotFoundError
        }
    }
});

reimRouter.post('/', (req:Request, res:Response)=>{
    console.log(req.body);
    res.sendStatus(501)
})

let reim: Reimbursement[] =
{
    reimbursementId: 1,
    author: 2,
    amount: 500.23,
    dateSubmitted: '2020-06-01 00:00:00',
    dateResolved: '2020-06-05 00:00:00',
    description: 'cost for hotel',
    resolver: 4,
    status: 2,
    type: 1
}

