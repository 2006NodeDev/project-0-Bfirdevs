import express, { Request, Response, NextFunction, response } from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { InvalidIdError } from '../errors/InvalidIdError'
import { DataNotFoundError } from '../errors/DataNotFoundErrors'
import { authenticationMiddleware } from '../middlewares/authentication-middleware'


export let reimRouter = express.Router()

// get(read) all reimbursements from the reimbursments table
reimRouter.get('/',(req:Request, res:Response)=>{
    res.json(reim);
})

/* read reimbursement with a specific id
    require id input
    if id is not number throw error
    if id is number go through each id from the table 
    if find the same id return it 
    else give not found error
*/
reimRouter.get('/:id', (req:Request, res:Response)=>{
    let {id} = req.params
    // unary operator, it converts the variable on the left to a number
    //the number on the left can be converted to a number it becomes NaN
    // if it is converted a number then the condition true, the id input wasn't a number 
    if(isNaN(+id)){
        throw new InvalidIdError
    }else {
        let exist = false; 
       // for (const reim in Reimbursement ){
        reim.forEach(element => {
            if(element.reimbursementId === +id ){
                exist = true;
                res.json(element);
            }
        })
        if(!exist){
            throw new DataNotFoundError;
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



//post reimbursement
reimRouter.post('/', authenticationMiddleware, (req:Request, res:Response, next:NextFunction)=>{
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

let reim: Reimbursement[] =
[ {
    reimbursementId: 1,
    author: 2,
    amount: 500.23,
    dateSubmitted: '2020-06-05 00:00:00',
    dateResolved: '2020-06-05 00:00:00',
    description: 'cost for hotel',
    resolver: 4,
    status: 2,
    type: 1
    }
]

