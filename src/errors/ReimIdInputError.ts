import { HttpError } from "./HttpError";

export class  ReimIdInputError extends HttpError{
    constructor (){
        super(400, 'Invalid ID')
    }
}