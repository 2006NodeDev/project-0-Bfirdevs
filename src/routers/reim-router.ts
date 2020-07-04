import express, {Request, Response, NextFunction} from 'express'
import { getAllReimbursements, findReimbursementByStatusId, findReimbursementByUser, submitNewReimbursement, updateExistingReimbursement } from '../daos/reim-dao';
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


reimRouter.get('/status/:status_id', authorizationMiddleWare(['Finance Manager']), async(req:Request, res:Response, next:NextFunction)=>{
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

reimRouter.get('/author/userId/:user_id', authorizationMiddleWare(['Finance Manager']), async(req:Request, res:Response, next:NextFunction)=>{
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

// Submit a reimbursment

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

// Update Reimbursement patch 

reimRouter.patch('/', authorizationMiddleWare(['Finance Manager']), async (req:Request, res:Response, next:NextFunction)=>{
    let{
        reimbursement_id,
        author,
        amount,
        description,
        status,
        type
    } = req.body

    if(!reimbursement_id || isNaN(reimbursement_id)){
        next (new InvalidIdError());
    }
    if(status === 'Approved' || status === "Denied"){
        let updatedReimbursement:Reimbursements ={
            reimbursement_id,
            author,
            amount,
            date_submitted: undefined,
            date_resolved: new Date(),
            description,
            resolver: req.session.user.user_id,
            status,
            type
        }
        updatedReimbursement.author = author || undefined
        updatedReimbursement.amount = amount || undefined
        updatedReimbursement.description = description || undefined
        updatedReimbursement.status = status || undefined
        updatedReimbursement.type = type || undefined

        try {
            let updatedReimResults = await updateExistingReimbursement(updatedReimbursement)
            res.json(updatedReimResults)
        } catch (error) {
            next(error)
        }
    } else {
        let updatedReimbursement:Reimbursements ={
            reimbursement_id,
            author,
            amount,
            date_submitted: undefined,
            date_resolved: null,
            description,
            resolver: null,
            status,
            type
        }
        updatedReimbursement.author = author || undefined
        updatedReimbursement.amount = amount || undefined
        updatedReimbursement.description = description || undefined
        updatedReimbursement.status = status || undefined
        updatedReimbursement.type = type || undefined
        
        try {
            let updatedReimResults = await updateExistingReimbursement(updatedReimbursement)
            res.json(updatedReimResults)
        } catch (error) {
            next(error)
        }
    }
    
})

