import { HttpError } from "./HttpError";

export class ReimNotFoundError extends HttpError{
    constructor(){
        super(404, 'Reimbursement not found')
    }
}