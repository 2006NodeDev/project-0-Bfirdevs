"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReimDTOtoReimbursementConvertor = void 0;
function ReimDTOtoReimbursementConvertor(rdto) {
    return {
        reimbursement_id: rdto.reimbursement_id,
        author: rdto.author,
        amount: rdto.amount,
        date_submitted: new Date(rdto.date_submitted),
        date_resolved: new Date(rdto.date_submitted),
        description: rdto.description,
        resolver: rdto.resolver,
        status: rdto.status,
        type: rdto.type
    };
}
exports.ReimDTOtoReimbursementConvertor = ReimDTOtoReimbursementConvertor;
//# sourceMappingURL=ReimbursementDTOConvertor.js.map