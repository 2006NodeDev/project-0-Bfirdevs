import { ReimbursementDTO } from "../dtos/reim-dto";
import { Reimbursement } from "../models/Reimbursement";

export function ReimburDTOtoReimburConvertor(bto:ReimbursementDTO): Reimbursement{
    
    return {
        reimbursementId:bto.reimbursementId,
        author: bto.author,
        amount: bto.amount,
        dateSubmitted: bto.dateSubmitted.getFullYear(),
        dateResolved: bto.dateResolved.getFullYear(),
        description: bto.description,
        resolver: bto.resolver,
        status: bto.status
    }
}