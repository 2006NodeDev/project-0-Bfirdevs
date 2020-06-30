import {PoolClient, QueryResult} from "pg";
import {connectionPool} from ".";
import { ReimburDTOtoReimburConvertor } from "../utils/ReimbursementDTOConvertor";
import { DataNotFoundError } from "../errors/DataNotFoundErrors";


//this is how to get data in the form of Reimbursement[]


// all async functions return  promise by default
// promise is a representation of a future value or an error
// async functions doesn't go to stack, it waits for promise to resolved then it goes back of the queue
export async function getAllReimbursement(){
    let client: PoolClient; // connection 
    try {
        // await means ; wait for the promise to get resolved then move with next line/code/statement
        client = await connectionPool.connect();
       
       let results: QueryResult= await client.query(`select * from ERS.reimbusement;`) // we can use both `` ''
       return results.rows.map(ReimburDTOtoReimburConvertor);
    } catch (error) {
        // should do error processing in this catch
        console.log(error)
        throw new Error('un-implemented error')
    }finally{
        // making sure the client isn't undefined
        client && client.release() // then we release it 
    }
}

export async function findReimbursementById(id:number){
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select * from ERS.reimbusement where reimbursementId = ${id} group by reimbursementId;`)
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

export async function findReimbursementByStatusId(statusId:number){
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select * from ERS.reimbusement where reimbursementId = ${statusId} group by reimbursementId;`)
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

export async function findReimbursementByUserId(userId:number){
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        let results: QueryResult= await client.query(`select * from ERS.reimbusement where reimbursementId = ${userId} group by reimbursementId;`)
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