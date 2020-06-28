

// this data is going to be representation of the reimbursement data that we get from database
export class ReimbursDTO{
    reimbursementId: number
	author: number
	amount: number
    dateSubmitted: number
    dateResolved: number
    description: string
    resolver: number
    status: number
    type: number 
}