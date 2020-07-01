import {PoolClient, QueryResult} from "pg";
import {connectionPool} from ".";
import { ReimburDTOtoReimburConvertor } from "../utils/ReimbursementDTOConvertor";
import { DataNotFoundError } from "../errors/DataNotFoundErrors";
import { Reimbursement } from "../models/Reimbursement";


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
                                                    join ERS.reimbursement_status rs on r.status = rs.status_id
                                                    join ERS.reimbursement_type rt on r."type" = rt.type_id
                                                    order by r.date_submitted;`);
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


export async function findReimbursementByStatusId(statusId:number):Promise<Reimbursement>{
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select r."reimbursement_id", 
                                                    r."author", 
                                                    r."amount", 
                                                    r."date_submitted",
                                                    r."date_resolved",
                                                    r."description",
                                                    r."resolver",
                                                    rs."status_id", 
                                                    rs."status",
                                                    rt."type_id",
                                                    rt."type"
                                                    from ERS.reimbursements r 
                                                    left join ERS.reimbursement_statuses rs
                                                    on r."status" = rs."status_id" 
                                                    left join ERS.reimbursement_types rt
                                                    on r."type" = rt."type_id"
                                                     where r."status" = $1
                                                    order by r.date_submitted;`, [statusId])
        if(results.rowCount === 0){
            throw new DataNotFoundError
        }else {
            return ReimburDTOtoReimburConvertor(results.rows[0])
        }
    } catch (error) {
        console.log(error)
        throw new Error('un-implemented error')
    }finally{
        client && client.release()
    }
} 

export async function findReimbursementByUserId(userId:number):Promise<Reimbursement>{
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select r."reimbursement_id", 
                                                    r."author", r."amount", 
                                                    r."date_submitted",
                                                    r."date_resolved",
                                                    r."description", r."resolver",
                                                    rs."status_id", rs."status",
                                                    rt."type_id", rt."type"
                                                    from.reimbursements r 
                                                    left join ERS.reimbursement_statuses rs
                                                    on r."status" = rs."status_id" 
                                                    left join ERS.reimbursement_types rt
                                                    on r."type" = rt."type_id"
                                                    left join ERS.users u 
                                                    on r."author" = u."user_id"
                                                        where u."user_id" = $1
                                                    order by r.date_submitted;`, [userId] )
        if(results.rowCount === 0){
            throw new DataNotFoundError
        }else {
            return ReimburDTOtoReimburConvertor(results.rows[0])
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
        let results = 
    } catch (error) {
        
    }
}

// Update REsimbursement Patch Method 
export async function UpdateReimbursementInfo(UpdatedReimbursement: Reimbursement): Promise<Reimbursement>{
    let client
}