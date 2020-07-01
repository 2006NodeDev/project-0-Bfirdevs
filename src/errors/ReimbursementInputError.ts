import { HttpError } from "./HttpError";


export class RaimbursementInputError extends HttpError {
    constructor(){//has no params
        super(400, 'Please fill out all necessary fields')
    }
}