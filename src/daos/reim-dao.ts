
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { ReimDTOtoReimbursementConvertor } from "../utils/ReimbursementDTOConvertor";
import { ReimbursementNotFound } from "../errors/ReimbursementNotFoundErrors";





//Promise is representation of a future value of an error
export async function getAllReimbursements(){
    let client: PoolClient;
    try {
        client = await connectionPool.connect()
        let getAllReimResults:QueryResult = await client.query(`select * from employee_data.reimbursements r
        order by r.date_submitted;`)
        if(getAllReimResults.rowCount ===0){
            throw new ReimbursementNotFound();
        }else{
            return getAllReimResults.rows.map(ReimDTOtoReimbursementConvertor)
        }
        
    } catch (error) {
        console.error();
        throw new Error('un implemented error')
    }finally{
        //  && guard operator we are making sure that client is exist then we release
        client && client.release()
    }
}

export async function findReimbursementByStatusId(status_id:number){
    let client : PoolClient
    try {
        client = await connectionPool.connect()
        let reimByStatusIdResult: QueryResult = await client.query(`select r.reimbursement_id,
        u1.user_id as author, 
        r.amount, 
        r.date_submitted, 
        r.date_resolved, 
        r.description, 
        u2.user_id as resolver, 
        rs.status, 
        rs.status_id, 
        rt."type", 
        rt.type_id 
        from employee_data.reimbursements r
        left join employee_data.reimbursement_type rt on r."type" = rt.type_id
        left join employee_data.reimbursement_status rs on r.status = rs.status_id
        left join employee_data.users u1 on r.author = u1.user_id
        left join employee_data.users u2 on r.resolver = u2.user_id
        where r.status = ${status_id} order by r.date_submitted;`)
        if(reimByStatusIdResult.rowCount ===0){
            throw new Error('Reimbursement Not Found')
        }else{
            return reimByStatusIdResult.rows.map(ReimDTOtoReimbursementConvertor)
        }
    } catch (error) {
        if(error.message === 'Reimbursement Not Found'){
            throw new ReimbursementNotFound();
        }
        console.log(error)
        throw new Error('un implemented error handling')
    }finally{
        //  && guard operator we are making sure that client is exist then we release
        client && client.release()
    }
}

export async function findReimbursementByUser(user_id:number){
    let client : PoolClient
    try {
        client = await connectionPool.connect()
        let reimByUserIdResult: QueryResult = await client.query(`select r.reimbursement_id,
        u1.user_id as author, 
        r.amount, 
        r.date_submitted, 
        r.date_resolved, 
        r.description, 
        u2.user_id as resolver, 
        rs.status, 
        rs.status_id, 
        rt."type", 
        rt.type_id 
        from employee_data.reimbursements r
        left join employee_data.reimbursement_type rt on r."type" = rt.type_id
        left join employee_data.reimbursement_status rs on r.status = rs.status_id
        left join employee_data.users u1 on r.author = u1.user_id
        left join employee_data.users u2 on r.resolver = u2.user_id
        where u1.user_id = ${user_id} order by r.date_submitted;`)
        if(reimByUserIdResult.rowCount ===0){
            throw new Error('Reimbursement Not Found')
        }else{
            return reimByUserIdResult.rows.map(ReimDTOtoReimbursementConvertor)
        }
    } catch (error) {
        if(error.message === 'Reimbursement Not Found'){
            throw new ReimbursementNotFound();
        }
        console.log(error)
        throw new Error('un implemented error handling')
    }finally{
        //  && guard operator we are making sure that client is exist then we release
        client && client.release()
    }
}