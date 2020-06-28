import {PoolClient, QueryResult} from "pg";
import {connectionPool} from ".";

export async function getAllReimbursement(){
    let client: PoolClient;

    try {
        client = await connectionPool.connect()
        let results: QueryResult = await client.query()
    }
}