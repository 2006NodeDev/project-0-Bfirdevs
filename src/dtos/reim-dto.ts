
/*
DTO; Data transfer object 
holds data in one format with the purpose of being converted to a different format
*/

// this data is going to be representation of the reimbursement data that we get from database
export class ReimbursementDTO{
    reimbursementId: number
	author: number
	amount: number
    dateSubmitted: Date
    dateResolved: Date
    description: string
    resolver: number
    status: number
    type: number 
}