import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { UsersDTOtoUsersConvertor } from "../utils/UsersDTOConvertors";
import { UserNotFound } from "../errors/UserNotFoundError";



//Promise is representation of a future value of an error
export async function getAllUsers(){
    let client: PoolClient;
    try {
        client = await connectionPool.connect()
        let getAllUsers:QueryResult = await client.query(`select u.user_id, 
        u.username,  
        u."password", u.first_name, 
        u.last_name, u.email, 
        r."role" , r.role_id
        from employee_data.users u  left join employee_data.roles r on u."role" = r.role_id;`)
        return getAllUsers.rows.map(UsersDTOtoUsersConvertor)
    } catch (error) {
        console.error();
        throw new Error('un implemented error')
    }finally{
        //  && guard operator we are making sure that client is exist then we release
        client && client.release()
    }
}



export async function findUserById(user_id:number){
    let client: PoolClient;
    try {
        client = await connectionPool.connect()
        let getUserById:QueryResult = await client.query(`select  u.username,  
        u."password", u.first_name, 
        u.last_name, u.email, 
        r."role" , r.role_id
        from employee_data.users u  left join employee_data.roles r on u."role" = r.role_id 
        where u.user_id = ${user_id};`)
        if(getUserById.rowCount === 0){
            throw new Error('User not found')
        }else{
            return getUserById.rows.map(UsersDTOtoUsersConvertor)
        }
    } catch (error) {
        if(error.message === 'User not found'){
            throw new UserNotFound();
        }
        console.error();
        throw new Error('un implemented error')
    }finally{
        //  && guard operator we are making sure that client is exist then we release
        client && client.release()
    }
}