import { HttpError } from "./HttpError";

export class DataNotFoundError extends HttpError{
    constructor(){
        super(404, 'Item not found')
    }
}