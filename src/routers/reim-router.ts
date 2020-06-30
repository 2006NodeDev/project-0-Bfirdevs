import express, { Request, Response, NextFunction, } from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { InvalidIdError } from '../errors/InvalidIdError'
import { DataNotFoundError } from '../errors/DataNotFoundErrors'

import { getAllReimbursement, findReimbursementById } from '../daos/reim-dao'


export let reimRouter = express.Router()

//,authorizationMiddleWare(['financemanager']), this line goes inside lines
// get(read) all reimbursements from the reimbursments table
reimRouter.get('/', async (req:Request, res: Response, next:NextFunction)=>{
    try{
        let reimbursement = await getAllReimbursement()
    res.json(reimbursement);
    }catch(e){
        next(e)
    }   
})

 // + unary operator, it converts the variable on the left to a number
    //the number on the left can be converted to a number it becomes NaN
    // if it is converted a number then the condition true, the id input wasn't a number 
reimRouter.get('/:id', async (req:Request, res:Response, next:NextFunction)=>{
    let {id} = req.params

    if(isNaN(+id)){
        next(new InvalidIdError());
    }else {
        try{
            let reimbursement = await findReimbursementById(+id)
            res.json(reimbursement)
        }catch (error){
            next(error);
        }
    }
});

// get reimbursement  with status 
// URL: reimbursements/status/:statusId ?????

reimRouter.get('/status/:statusId', (req:Request , res:Response)=>{
    let {status_id} = req.params;
    if(isNaN(+status_id)){
         throw new InvalidIdError;
    }else {
        let exist = false;
        reim.forEach(element =>{
            if(element.status === +status_id){
                exist = true;
                res.json(element);
            }
        })
        if(!exist){
            throw new DataNotFoundError;
        }
    }
})
// get reimbursement with userid means author
// URL: reimbursements/author/userId/:userId`  
reimRouter.get('/author/userId/:userId', (req:Request, res:Response)=>{
    let {user_id} = req.params;
    if(isNaN(+user_id)){
        throw new InvalidIdError;
    }else {
        let isExist = false;
        reim.forEach(element=>{
            isExist = true;
           res.json(element);
        })
        if(!isExist){
            throw new DataNotFoundError;
        }
    }
})

// update reimbursement with patch method


/*
//post reimbursement
reimRouter.post('/', loggingMiddleware ,authenticationMiddleware, (req:Request, res:Response, next:NextFunction)=>{
    let {
        reimbursementId = 0,
         author,
         amount,
        dateSubmitted,
        dateResolved,
        description,
        resolver,
        status,
        type 
    } = req.body

})
*/

let reim: Reimbursement[] =
[ {
    reimbursementId: 1,
    author: 2,
    amount: 500.23,
    dateSubmitted: new Date('December 17, 1995'),
    dateResolved: new Date('2020-06-05T00:00:00'),
    description: 'cost for hotel',
    resolver: 4,
    status: 2,
    type: 1
    }
]

