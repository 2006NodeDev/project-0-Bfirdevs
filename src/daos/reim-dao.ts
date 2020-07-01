import {PoolClient, QueryResult} from "pg";
import {connectionPool} from ".";
import { ReimburDTOtoReimburConvertor } from "../utils/ReimbursementDTOConvertor";
import { DataNotFoundError } from "../errors/DataNotFoundErrors";
import { Reimbursement } from "../models/Reimbursement";
import { RaimbursementInputError } from "../errors/ReimbursementInputError";


//this is how to get data in the form of Reimbursement[]


// all async functions return  promise by default
// promise is a representation of a future value or an error
// async functions doesn't go to stack, it waits for promise to resolved then it goes back of the queue
export async function getAllReimbursement(): Promise<Reimbursement[]>{
    let client: PoolClient; // connection 
    try {
        // await means ; wait for the promise to get resolved then move with next line/code/statement
        client = await connectionPool.connect();
       
       let results: QueryResult= await client.query(`select r.*, rs.status, rs."status_id", rt."type", rt."type_id" 
                                                    from ERS.reimbursement r
                                                    join ERS.reimbursementstatus rs on r.status = rs.status_id
                                                    join ERS.reimbursementtype rt on r."type" = rt.type_id
                                                    order by r.dateSubmitted;`);
        if(results.rowCount === 0){
            throw new DataNotFoundError();
        }else{
            return results.rows.map(ReimburDTOtoReimburConvertor);
        }
    } catch (error) {
        // should do error processing in this catch
        if(error.message === "Reimbursements Not Found"){
            console.log(error)
            throw new DataNotFoundError();
        }
        throw new Error('un-implemented error')
    }finally{
        // making sure the client isn't undefined
        client && client.release() // then we release it 
    }
}


export async function findReimbursementByStatusId(statusId:number):Promise<Reimbursement[]>{
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select r."reimbursement_id", 
                                                    r."author", 
                                                    r."amount", 
                                                    r."dateSubmitted",
                                                    r."dateResolved",
                                                    r."description",
                                                    r."resolver",
                                                    rs."status_id", 
                                                    rs."status",
                                                    rt."type_id",
                                                    rt."type"
                                                    from ERS.reimbursement r 
                                                    left join ERS.reimbursementstatus rs
                                                    on r."status" = rs."status_id" 
                                                    left join ERS.reimbursementtypes rt
                                                    on r."type" = rt."type_id"
                                                     where r."status" = $1
                                                    order by r.datSubmitted;`, [statusId])
        if(results.rowCount === 0){
            throw new DataNotFoundError
        }else {
            return results.rows.map(ReimburDTOtoReimburConvertor);
        }
    } catch (error) {
        console.log(error)
        throw new Error('un-implemented error')
    }finally{
        client && client.release()
    }
} 

export async function findReimbursementByUserId(userId:number):Promise<Reimbursement[]>{
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select r."reimbursement_id", 
                                                    r."author", r."amount", 
                                                    r."dateSubmitted",
                                                    r."dateResolved",
                                                    r."description", r."resolver",
                                                    rs."status_id", rs."status",
                                                    rt."type_id", rt."type"
                                                    from.reimbursement r 
                                                    left join ERS.reimbursementstatus rs
                                                    on r."status" = rs."status_id" 
                                                    left join ERS.reimbursementtypes rt
                                                    on r."type" = rt."type_id"
                                                    left join ERS.users u 
                                                    on r."author" = u."user_id"
                                                    where u."user_id" = $1
                                                    order by r.dateSubmitted;`, [userId] )
        if(results.rowCount === 0){
            throw new DataNotFoundError
        }else {
            return results.rows.map(ReimburDTOtoReimburConvertor);
        }
    } catch (error) {
        console.log(error)
        throw new Error('un-implemented error')
    }finally{
        client && client.release()
    }
}


// Submit Reimbursement Post Method
export async function SubmitNewReimbursement(newReim: Reimbursement):Promise<Reimbursement>{
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;')
        let typeId = await client.query(`select t."type_id" from ERS.reimbursementtypes t 
                                            where t."type" = $1;`, [newReim.type])
        if(typeId.rowCount === 0) {
            throw new Error('Type Not Found')
        }
        typeId = typeId.rows[0].type_id 
        let statusId = await client.query(`select rs."status_id" from ERS.reimbursementstatus rs 
                                            where rs."status" = $1;`, [newReim.status])
        if(statusId.rowCount === 0) {
            throw new Error('Status Not Found')
        }
        statusId = statusId.rows[0].status_id
        let results = await client.query(`insert into ERS.reimbursement ("author", "amount", 
                                        "dateSubmitted", "description", "status", "type")
                                        values($1,$2,$3,$4,$5,$6) returning "reimbursement_id";`,
                                        [newReim.author, newReim.amount, newReim.dateSubmitted, newReim.description, statusId, typeId]) 
         newReim.reimbursement_id = results.rows[0].reimbursement_id
        
        await client.query('COMMIT;')
        return newReim
    } catch (e) {
        client && client.query('ROLLBACK;')
        if(e.message === 'Type Not Found' || e.message === 'Status Not Found') {
            throw new RaimbursementInputError()
        } 
        console.log(e);
        throw new Error('An Unknown Error Occurred')
    } finally {
        client && client.release()
    }
}


// Update REsimbursement Patch Method 
export async function UpdateReimbursementInfo(updatedReimbursement:Reimbursement):Promise<Reimbursement> {
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        if(updatedReimbursement.author) {
            await client.query(`update ERS.reimbursement set "author" = $1 
                                where "reimbursement_id" = $2;`, 
                                [updatedReimbursement.author, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.amount) {
            await client.query(`update ERS.reimbursement set "amount" = $1 
                                where "reimbursement_id" = $2;`, 
                                [updatedReimbursement.amount, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.dateSubmitted) {
            await client.query(`update ERS.reimbursement set "dateSubmitted" = $1 
                                where "reimbursement_id" = $2;`, 
                                [updatedReimbursement.dateSubmitted, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.dateResolved) {
            await client.query(`update ERS.reimbursement set "dateResolved" = $1 
                                where "reimbursement_id" = $2;`, 
                                [updatedReimbursement.dateResolved, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.description) {
            await client.query(`update ERS.reimbursement set "description" = $1 
                                where "reimbursement_id" = $2;`, 
                                [updatedReimbursement.description, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.resolver) {
            await client.query(`update ERS.reimbursement set "resolver" = $1 
                                where "reimbursement_id" = $2;`, 
                                [updatedReimbursement.resolver, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.status) {
            let statusId = await client.query(`select rs."status_id" from ERS.reimbursementstatus rs 
                                            where rs."status" = $1;`, [updatedReimbursement.status])
            if(statusId.rowCount === 0) {
                throw new Error('Status Not Found')
            }
            statusId = statusId.rows[0].status_id
            await client.query(`update ERS.reimbursement set "status" = $1 
                                where "reimbursement_id" = $2;`, 
                                [statusId, updatedReimbursement.reimbursement_id])
        }
        if(updatedReimbursement.type) {
            let typeId = await client.query(`select rt."type_id" from ERS.reimbursementtypes rt 
                                            where rt."type" = $1;`, [updatedReimbursement.type])
            if(typeId.rowCount === 0) {
                throw new Error('Type Not Found')
            }
            typeId = typeId.rows[0].type_id
            await client.query(`update ERS.reimbursement set "type" = $1 
                                where "reimbursement_id" = $2;`, 
                                [typeId, updatedReimbursement.reimbursement_id])
        }

        await client.query('COMMIT;')
        return updatedReimbursement
    } catch(e) {
        client && client.query('ROLLBACK;')
        if(e.message == 'Status Not Found' || e.message == 'Type Not Found') {
            throw new RaimbursementInputError()
        }
        console.log(e);
        throw new Error('An Unknown Error Occurred')
    } finally {
        client && client.release()
    }
}
