import {PoolClient, QueryResult} from "pg";
import {connectionPool} from ".";


// all async functions return  promise by default
// promise is a representation of a future value or an error
// async functions doesn't go to stack, it waits for promise to resolved then it goes back of the queue
export async function getAllReimbursement(){
    let client: PoolClient; // connection 
    try {
        // await means ; wait for the promise to get resolved then move with next line/code/statement
        client = await connectionPool.connect();
       let results: QueryResult= await client.query(`select * from ERS.reimbusement;`) // we can use both `` ''
       return results.rows;
    } catch (error) {
        // should do error processing in this catch
        console.log(error)
        throw new Error('un-implemented error')
    }finally{
        // making sure the client isn't undefined
        client && client.release() // then we release it 
    }
}

