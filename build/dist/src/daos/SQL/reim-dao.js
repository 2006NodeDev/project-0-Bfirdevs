"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findReimbursementById = exports.updateExistingReimbursement = exports.submitNewReimbursement = exports.findReimbursementByUser = exports.findReimbursementByStatusId = exports.getAllReimbursements = void 0;
var _1 = require(".");
var ReimbursementDTOConvertor_1 = require("../../utils/ReimbursementDTOConvertor");
var ReimbursementNotFoundErrors_1 = require("../../errors/ReimbursementNotFoundErrors");
var ReimbursementInputError_1 = require("../../errors/ReimbursementInputError");
//Promise is representation of a future value of an error
function getAllReimbursements() {
    return __awaiter(this, void 0, void 0, function () {
        var client, getAllReimResults, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select * from employee_data.reimbursements r\n        order by r.date_submitted;")];
                case 2:
                    getAllReimResults = _a.sent();
                    if (getAllReimResults.rowCount === 0) {
                        throw new ReimbursementNotFoundErrors_1.ReimbursementNotFound();
                    }
                    else {
                        return [2 /*return*/, getAllReimResults.rows.map(ReimbursementDTOConvertor_1.ReimDTOtoReimbursementConvertor)];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error();
                    throw new Error('un implemented error');
                case 4:
                    //  && guard operator we are making sure that client is exist then we release
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllReimbursements = getAllReimbursements;
function findReimbursementByStatusId(statusId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, reimByStatusIdResult, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select r.reimbursement_id,\n        u1.user_id as author, \n        r.amount, \n        r.date_submitted, \n        r.date_resolved, \n        r.description, \n        u2.user_id as resolver, \n        rs.status, \n        rs.status_id, \n        rt.\"type\", \n        rt.type_id \n        from employee_data.reimbursements r\n        left join employee_data.reimbursement_type rt on r.\"type\" = rt.type_id\n        left join employee_data.reimbursement_status rs on r.status = rs.status_id\n        left join employee_data.users u1 on r.author = u1.user_id\n        left join employee_data.users u2 on r.resolver = u2.user_id\n        where r.status = $1 order by r.date_submitted;", [statusId])];
                case 2:
                    reimByStatusIdResult = _a.sent();
                    if (reimByStatusIdResult.rowCount === 0) {
                        throw new Error('Reimbursement Not Found');
                    }
                    else {
                        return [2 /*return*/, ReimbursementDTOConvertor_1.ReimDTOtoReimbursementConvertor(reimByStatusIdResult.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    if (error_2.message === 'Reimbursement Not Found') {
                        throw new ReimbursementNotFoundErrors_1.ReimbursementNotFound();
                    }
                    console.log(error_2);
                    throw new Error('un implemented error handling');
                case 4:
                    //  && guard operator we are making sure that client is exist then we release
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findReimbursementByStatusId = findReimbursementByStatusId;
function findReimbursementByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, reimByUserIdResult, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select r.reimbursement_id,\n        u1.user_id as author, \n        r.amount, \n        r.date_submitted, \n        r.date_resolved, \n        r.description, \n        u2.user_id as resolver, \n        rs.status, \n        rs.status_id, \n        rt.\"type\", \n        rt.type_id \n        from employee_data.reimbursements r\n        left join employee_data.reimbursement_type rt on r.\"type\" = rt.type_id\n        left join employee_data.reimbursement_status rs on r.status = rs.status_id\n        left join employee_data.users u1 on r.author = u1.user_id\n        left join employee_data.users u2 on r.resolver = u2.user_id\n        where u1.user_id = $1 order by r.date_submitted;", [userId])];
                case 2:
                    reimByUserIdResult = _a.sent();
                    if (reimByUserIdResult.rowCount === 0) {
                        throw new Error('Reimbursement Not Found');
                    }
                    else {
                        return [2 /*return*/, ReimbursementDTOConvertor_1.ReimDTOtoReimbursementConvertor(reimByUserIdResult.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    if (error_3.message === 'Reimbursement Not Found') {
                        throw new ReimbursementNotFoundErrors_1.ReimbursementNotFound();
                    }
                    console.log(error_3);
                    throw new Error('un implemented error handling');
                case 4:
                    //  && guard operator we are making sure that client is exist then we release
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findReimbursementByUser = findReimbursementByUser;
function submitNewReimbursement(newReimbursement) {
    return __awaiter(this, void 0, void 0, function () {
        var client, typeId, results, _a, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, 7, 8]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _b.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, client.query("select rt.type_id from employee_data.reimbursement_type rt where rt.\"type\" = $1;", [newReimbursement.type])];
                case 3:
                    typeId = _b.sent();
                    if (typeId.rowCount === 0) {
                        throw new Error('Type not found');
                    }
                    else {
                        typeId = typeId.rows[0].type_id;
                    }
                    results = client.query("insert into employee_data.reimbursements(\"author\", \"amount\", \"date_submitted\", \"date_resolved\", \"description\", \"resolver\", \"status\", \"type\") values ($1, $2, $3, $4, $5, $6, $7, $8) returning reimbursement_id", [newReimbursement.author, newReimbursement.amount, newReimbursement.date_submitted, newReimbursement.date_resolved, newReimbursement.description, newReimbursement.resolver, newReimbursement.status, typeId]);
                    _a = newReimbursement;
                    return [4 /*yield*/, results];
                case 4:
                    _a.reimbursement_id = (_b.sent()).rows[0].reimbursement_id;
                    return [4 /*yield*/, client.query('COMMIT;')];
                case 5:
                    _b.sent();
                    return [2 /*return*/, newReimbursement];
                case 6:
                    error_4 = _b.sent();
                    client && client.query('ROLLBACK;');
                    if (error_4.message === 'Type not found') {
                        throw new ReimbursementInputError_1.ReimbursementInputError();
                    }
                    console.log(error_4);
                    throw new Error('un implemented error handling');
                case 7:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.submitNewReimbursement = submitNewReimbursement;
// Update Reimbursement
function updateExistingReimbursement(updateReim) {
    return __awaiter(this, void 0, void 0, function () {
        var client, status_id, type_id, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 18, 19, 20]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    if (!updateReim.amount) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.query("update employee_data.reimbursements  set \"amount\" = $1 where \"reimbursement_id\" = $2;", [updateReim.amount, updateReim.reimbursement_id])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!updateReim.date_resolved) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.query("update employee_data.reimbursements  set \"date_resolved\" = $1 where \"reimbursement_id\" = $2;", [updateReim.date_resolved, updateReim.reimbursement_id])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!updateReim.description) return [3 /*break*/, 8];
                    return [4 /*yield*/, client.query("update employee_data.reimbursements  set \"description\" = $1 where \"reimbursement_id\" = $2;", [updateReim.description, updateReim.reimbursement_id])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!updateReim.resolver) return [3 /*break*/, 10];
                    return [4 /*yield*/, client.query("update employee_data.reimbursements  set \"resolver\" = $1 where \"reimbursement_id\" = $2;", [updateReim.resolver, updateReim.reimbursement_id])];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    if (!updateReim.status) return [3 /*break*/, 13];
                    return [4 /*yield*/, client.query("select rs.\"status_id\" from employee_data.reimbursement_status rs  where rs.\"status\" = $1;", [updateReim.status])];
                case 11:
                    status_id = _a.sent();
                    if (status_id.rowCount === 0) {
                        throw new Error('Status Not Found');
                    }
                    status_id = status_id.rows[0].status_id;
                    return [4 /*yield*/, client.query("update employee_data.reimbursements  set \"status\" = $1 where reimbursement_id = $2;", [status_id, updateReim.reimbursement_id])];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    if (!updateReim.type) return [3 /*break*/, 16];
                    return [4 /*yield*/, client.query("select rt.\"type_id\" from employee_data.reimbursement_type rt where rt.\"type\" = $1;", [updateReim.type])];
                case 14:
                    type_id = _a.sent();
                    if (type_id.rowCount === 0) {
                        throw new Error("Type Not Found");
                    }
                    type_id = type_id.rows[0].type_id;
                    return [4 /*yield*/, client.query('update employee_data.reimbursements  set "type"= $1 where reimbursement_id = $2;', [type_id, updateReim.reimbursement_id])];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16: return [4 /*yield*/, client.query('COMMIT;')];
                case 17:
                    _a.sent();
                    return [2 /*return*/, findReimbursementById(updateReim.reimbursement_id)];
                case 18:
                    error_5 = _a.sent();
                    client && client.query('ROLLBACK;');
                    if (error_5.message === 'Status Not Found') {
                        throw new Error('Status Not Found');
                    }
                    else if (error_5.message === 'Type Not Found') {
                        throw new Error('Type Not Found');
                    }
                    else if (error_5.message === 'Invalid ID') {
                        throw new Error('Invalid ID');
                    }
                    console.log(error_5);
                    throw new Error('Unhandled Error');
                case 19:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.updateExistingReimbursement = updateExistingReimbursement;
function findReimbursementById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, getReimbursmentById, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select * from employee_data.reimbursements r \n        left join employee_data.users u on r.author = u.user_id \n        left join employee_data.reimbursement_status rs  on r.status = rs.status_id \n        left join employee_data.reimbursement_type rt on rt.type_id = r.\"type\"  \n        where r.reimbursement_id = $1 order by r.date_submitted;", [id])];
                case 2:
                    getReimbursmentById = _a.sent();
                    if (getReimbursmentById.rowCount === 0) {
                        throw new Error('Reimbursement not found');
                    }
                    else {
                        // because there will be one object
                        return [2 /*return*/, ReimbursementDTOConvertor_1.ReimDTOtoReimbursementConvertor(getReimbursmentById.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_6 = _a.sent();
                    if (error_6.message === 'Reimbursement not found') {
                        throw new ReimbursementNotFoundErrors_1.ReimbursementNotFound();
                    }
                    console.error();
                    throw new Error('un implemented error');
                case 4:
                    //  && guard operator we are making sure that client is exist then we release
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findReimbursementById = findReimbursementById;
//# sourceMappingURL=reim-dao.js.map