import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UsersDTOConvertors } from "../utils/UsersDTOConvertors";
import { DataNotFoundError } from "../errors/DataNotFoundErrors";
import { UserNotFound } from "../errors/UserNotFoundError";

export async function getAllUsers(){
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results =  await client.query('select u.user_id, u.username, u."password", u.email, r.role_id  from ERS.users u left join ERS.roles on u."role" = r.role_id;')
        return  results.rows.map(UsersDTOConvertors)
    } catch (error) {
        console.log(error)
        throw new Error ('Oops Can\'t get the data')
    }finally{
        //&& guard operator it make sure "client exist", if it is then release the client
        client && client.release();
    }
}


export async function findUserById(id:number){
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        //$1 specifies the paramater
        //we fill in a value using an array as the second arg of the query function
        let results: QueryResult = await client.query('select u.user_id, u.username, u."password", u.email, r.role_id  from ERS.users u left join ERS.roles r on u."role" = r.role_id where u.user_id = $1;', [id])
        if(results.rowCount === 0){
            throw new DataNotFoundError
        }else {
            return UsersDTOConvertors(results.rows[0])
        }
    } catch (error) {
        if(error.message === 'User Not Found'){
            throw new UserNotFound
        } else {
            console.log(error)
            throw new Error ('Unhandled Error Occured')
        }
    }finally{
        client && client.release();
    }
}