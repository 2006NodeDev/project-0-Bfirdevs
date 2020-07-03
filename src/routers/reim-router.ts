import express, {Request, Response, NextFunction} from 'express'
import { getAllReimbursements, findReimbursementByStatusId, findReimbursementByUser, submitNewReimbursement } from '../daos/reim-dao';
import { InvalidIdError } from '../errors/InvalidIdError';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';
import { Reimbursements } from '../models/Reimbursements';
import { ReimbursementInputError } from '../errors/ReimbursementInputError';
import { authorizationMiddleWare } from '../middlewares/authorizationMiddleware';


export let reimRouter = express.Router();

reimRouter.use(authenticationMiddleware)

reimRouter.get('/', authorizationMiddleWare(['Finance Manager']),async (req:Request, res:Response, next:NextFunction)=>{
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


 reimRouter.post('/', async (req:Request, res:Response, next:NextFunction)=>{
    
    let{
        amount,
        description,
        type
    } = req.body

    let author = req.session.user.user_id;
    //console.log(author)

    if( !author || !amount || !description  || !type){
        next(new ReimbursementInputError())
    }else{
        let newReimbursement: Reimbursements ={
            reimbursement_id: 0,
            author,
            amount,
            date_submitted: new Date(),
            date_resolved: null ,
            description,
            resolver:null,
            status:3,
            type,
        }
        try {
            let submitReim = await submitNewReimbursement(newReimbursement)
            res.json(submitReim)
        } catch (error) {
            next(error)
        }  
    }
    
})


