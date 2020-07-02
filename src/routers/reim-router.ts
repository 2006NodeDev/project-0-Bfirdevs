import express, {Request, Response, NextFunction} from 'express'

import { getAllReimbursements, findReimbursementByStatusId, findReimbursementByUser } from '../daos/reim-dao';
import { InvalidIdError } from '../errors/InvalidIdError';
import { UserMissingInputError } from '../errors/UserMissingInputError';

export let reimRouter = express.Router();


reimRouter.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let reimburs = await getAllReimbursements()
        res.json(reimburs)
    } catch (error) {
        next(error)
    }
    
})


reimRouter.get('/status/:status_id', async(req:Request, res:Response, next:NextFunction)=>{
    let {status_id} = req.params
    if(isNaN(+status_id)){
        throw new InvalidIdError()
    }else {
       try {
            let reimByStatusId = await findReimbursementByStatusId(+status_id)
            res.json(reimByStatusId)
       } catch (error) {
           next(error)
       }
        
    }
})

reimRouter.get('/author/userId/:user_id', async(req:Request, res:Response, next:NextFunction)=>{
    let {user_id} = req.params
    if(isNaN(+user_id)){
        throw new InvalidIdError()
    }else {
       try {
            let reimByUserId = await findReimbursementByUser(+user_id)
            res.json(reimByUserId)
       } catch (error) {
           next(error)
       }
        
    }
})

 reimRouter.post('/', (req:Request, res:Response)=>{
    console.log(req.body);
    let{
        reimbursement_id,
        author,
        amount,
        date_submitted,
        date_resolved,
        description,
        resolver,
        status,
        type
    } = req.body
    if(reimbursement_id && author && amount && date_submitted && date_resolved && description && resolver && status && type){
     //   reimbursements.push(reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
        res.sendStatus(201)
    }else{
        throw new UserMissingInputError();
    }
    
})


