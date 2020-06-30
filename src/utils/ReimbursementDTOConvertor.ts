import { ReimbursementDTO } from "../dtos/reim-dto";
import { Reimbursement } from "../models/Reimbursement";

export function ReimburDTOtoReimburConvertor(rdto:ReimbursementDTO): Reimbursement{
    
    return {
        reimbursementId:rdto.reimbursementId,
        author: rdto.author,
        amount: rdto.amount,
        dateSubmitted: rdto.dateSubmitted.getFullYear(),
        dateResolved: rdto.dateResolved.getFullYear(),
        description: rdto.description,
        resolver: rdto.resolver,
        status: rdto.status
    }
}