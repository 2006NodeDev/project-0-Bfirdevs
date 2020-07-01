import express, { Request, Response, NextFunction, } from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { InvalidIdError } from '../errors/InvalidIdError'

import { getAllReimbursement, SubmitNewReimbursement, UpdateReimbursementInfo, findReimbursementByUserId, findReimbursementByStatusId } from '../daos/reim-dao'
import { UserMissingInputError } from '../errors/UserMissingInputError'
//import { authenticationMiddleware } from '../middlewares/authentication-middleware'


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


// get reimbursement  with status 
// URL: reimbursements/status/:statusId 

reimRouter.get('/status/:statusId', async (req:Request , res:Response, next:NextFunction)=>{
    let {statusId} = req.params;
    if(isNaN(+statusId)){
         throw new InvalidIdError();
    }else {
        try {
            let reimByStatusId = await findReimbursementByStatusId(+statusId);
            res.json(reimByStatusId);
        } catch (error) {
            next(error);
        }
    }
})

// get reimbursement with userid means author
// URL: reimbursements/author/userId/:userId`  
reimRouter.get('/author/userId/:userId', async (req:Request, res:Response, next:NextFunction)=>{
    let {userId} = req.params;
    if(isNaN(+userId)){
        throw new InvalidIdError();
    }else {
        try {
            let reimByUserId = await findReimbursementByUserId(+userId)
            res.json(reimByUserId)
        } catch (error) {
            next(error)
        }
    }
})

// update reimbursement with patch method
reimRouter.patch('/', async(req:Request, res:Response, next:NextFunction) => {
    let {
        reimbursementId,
        author,
        amount,
        dateSubmitted,
        dateResolved,
        description,
        resolver,
        status,
        type
    } = req.body 
    if(!reimbursementId){
        throw new UserMissingInputError();
    }else if (isNaN(+reimbursementId)) {
        throw new InvalidIdError();
    }else {
        let UpdateReimbursement: Reimbursement = {
            reimbursementId,
            author,
            amount,
            dateSubmitted,
            dateResolved,
            description,
            resolver,
            status,
            type
        }
        UpdateReimbursement.author = author 
        UpdateReimbursement.amount = amount 
        UpdateReimbursement.dateSubmitted = dateSubmitted
        UpdateReimbursement.dateResolved = dateResolved
        UpdateReimbursement.description = description
        UpdateReimbursement.resolver = resolver 
        UpdateReimbursement.status = status
        UpdateReimbursement.type = type
        try {
            let results = await UpdateReimbursementInfo(UpdateReimbursement)
            res.json(results)
        } catch (error) {
            next(error)
        }
    }

})




// post reimbursement

reimRouter.post('/', async(req: Request, res: Response, next:NextFunction) => {
    console.log(req.body);
    let {
        author,
        amount,
        dateSubmitted,
        description,
        status,
        type
    } = req.body
    if(author && amount && dateSubmitted && description && status && type){
        let newReimbursement: Reimbursement = {
            reimbursementId: 0,
            author,
            amount,
            dateSubmitted,
            dateResolved: null,
            description, 
            resolver: null,
            status,
            type
        }
        newReimbursement.author = author || null
        newReimbursement.amount = amount || null
        newReimbursement.dateSubmitted = dateSubmitted || null
        newReimbursement.dateResolved = null
        newReimbursement.description = description || null
        newReimbursement.resolver = null
        newReimbursement.status = status || null
        newReimbursement.type = type || null
        try {
            let newAddedReim = await SubmitNewReimbursement(newReimbursement)
            res.json(newAddedReim)
        } catch (error) {
            next(error)
        }
    }else {
        throw new UserMissingInputError();
    }
})

/*
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

*/