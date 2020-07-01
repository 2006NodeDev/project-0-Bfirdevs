import { ReimbursementDTO } from "../dtos/reim-dto";
import { Reimbursement } from "../models/Reimbursement";

export function ReimburDTOtoReimburConvertor(rdto:ReimbursementDTO): Reimbursement{
    return {
        reimbursementId: rdto.reimbursementId,
        author: rdto.author,
        amount: rdto.amount,
        dateSubmitted: new Date(rdto.dateSubmitted),
        dateResolved: new Date(rdto.dateSubmitted),
        description: rdto.description,
        resolver: rdto.resolver,
        status: rdto.status,
        type: rdto.status
    }
 
}