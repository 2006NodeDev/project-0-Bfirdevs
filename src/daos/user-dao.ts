import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UsersDTOConvertors } from "../utils/UsersDTOConvertors";
import { DataNotFoundError } from "../errors/DataNotFoundErrors";
import { UserNotFound } from "../errors/UserNotFoundError";
import { Users } from "../models/Users";
import { AuthFailureError } from "../errors/AuthFailureError";





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


export async function getUserById(id:number):Promise<Users>{
    let client : PoolClient;
    try {
        client = await connectionPool.connect()
        //$1 specifies the paramater
        //we fill in a value using an array as the second arg of the query function
        let results: QueryResult = await client.query('select u.user_id, u.username, u."password", u.email, r.role_id  from ERS.users u left join ERS.roles r on u."role" = r.role_id where u.user_id = $1;', [id])
       
        if(results.rowCount === 0){
            throw new DataNotFoundError();
        }else {
            return UsersDTOConvertors(results.rows[0])
        }
    } catch (error) {
        if(error.message === 'Item Not Found'){
            throw new UserNotFound();
        } else {
            console.log(error)
            throw new Error ('Unhandled Error Occured')
        }
    }finally{
        client && client.release();
    }
}
// Update User 
    export async function UpdateExistingUser(UpdatedUser: Users):Promise <Users>{
        let client : PoolClient
        try {
            client = await connectionPool.connect()

            await client.query(`update ERS.users 
                                            set "username" = $1, "password" = $2, "first_name" = $3, "last_name" = $4, "email" = $5, "role" = $6
                                            where user_id = $7 returning "user_id" `,
                                            [UpdatedUser.username, UpdatedUser.password, UpdatedUser.firstName, UpdatedUser.lastName, UpdatedUser.email, UpdatedUser.role, UpdatedUser.userId])
            return getUserById(UpdatedUser.userId);
            
        }catch(e){
            console.log(e)
            throw new Error('An Unknown Error Occurred')
    }finally{
            client && client.release();
    }
}

// login /getByUsername and Password
export async function getUserByUsernameAndPassword(username:string, password:string): Promise<Users>{
    let client : PoolClient
    try {
        // get connection
        client = await connectionPool.connect()
        //send the Query
        let results = await client.query(`select u."user_id", 
        u."username" , 
        u."password" , 
        u."firstname" ,
        u."lastname",
        u."email",
        r."role_id" , 
        r."role" 
        from ERS.users u left join ERS.roles r on u."role" = r.role_id 
        where u."username" = $1 and u."password" = $2;`,
    [username, password])
    if(results.rowCount === 0){
        throw new UserNotFound;
    }
    return UsersDTOConvertors(results.rows[0])
    } catch (error) {
        if(error.message === 'User Not Found'){
            throw new AuthFailureError();
        }
        console.log(error)
        throw new Error('Unhandled Error Copied')
    }finally {
        client && client.release()
    }
}