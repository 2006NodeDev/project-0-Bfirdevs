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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reimRouter = void 0;
var express_1 = __importDefault(require("express"));
var reim_dao_1 = require("../daos/SQL/reim-dao");
var InvalidIdError_1 = require("../errors/InvalidIdError");
var authentication_middleware_1 = require("../middlewares/authentication-middleware");
var ReimbursementInputError_1 = require("../errors/ReimbursementInputError");
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var AuthenticationFailure_1 = require("../errors/AuthenticationFailure");
exports.reimRouter = express_1.default.Router();
exports.reimRouter.use(authentication_middleware_1.authenticationMiddleware);
exports.reimRouter.get('/', authorizationMiddleware_1.authorizationMiddleWare(['Finance Manager']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reimburs, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, reim_dao_1.getAllReimbursements()];
            case 1:
                reimburs = _a.sent();
                res.json(reimburs);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.reimRouter.get('/status/:status_id', authorizationMiddleware_1.authorizationMiddleWare(['Finance Manager']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status_id, reimByStatusId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status_id = req.params.status_id;
                if (!isNaN(+status_id)) return [3 /*break*/, 1];
                throw new InvalidIdError_1.InvalidIdError();
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reim_dao_1.findReimbursementByStatusId(+status_id)];
            case 2:
                reimByStatusId = _a.sent();
                res.json(reimByStatusId);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.reimRouter.get('/author/userId/:user_id', authorizationMiddleware_1.authorizationMiddleWare(['Finance Manager', 'User']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, reimByUserId, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.user_id;
                if (!isNaN(+user_id)) return [3 /*break*/, 1];
                throw new InvalidIdError_1.InvalidIdError();
            case 1:
                if (!(req.session.user.user_id !== +user_id && req.session.user.role === "User")) return [3 /*break*/, 2];
                next(new AuthenticationFailure_1.AuthenticationFailure());
                return [3 /*break*/, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, reim_dao_1.findReimbursementByUser(+user_id)];
            case 3:
                reimByUserId = _a.sent();
                res.json(reimByUserId);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Submit a reimbursment
exports.reimRouter.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, amount, description, type, author, newReimbursement, submitReim, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, amount = _a.amount, description = _a.description, type = _a.type;
                author = req.session.user.user_id;
                if (!(!author || !amount || !description || !type)) return [3 /*break*/, 1];
                next(new ReimbursementInputError_1.ReimbursementInputError());
                return [3 /*break*/, 5];
            case 1:
                newReimbursement = {
                    reimbursement_id: 0,
                    author: author,
                    amount: amount,
                    date_submitted: new Date(),
                    date_resolved: null,
                    description: description,
                    resolver: null,
                    status: 3,
                    type: type,
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, reim_dao_1.submitNewReimbursement(newReimbursement)];
            case 3:
                submitReim = _b.sent();
                res.json(submitReim);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                next(error_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Update Reimbursement patch 
exports.reimRouter.patch('/', authorizationMiddleware_1.authorizationMiddleWare(['Finance Manager']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reimbursement_id, author, amount, description, status, type, updatedReimbursement, updatedReimResults, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, reimbursement_id = _a.reimbursement_id, author = _a.author, amount = _a.amount, description = _a.description, status = _a.status, type = _a.type;
                if (!reimbursement_id || isNaN(reimbursement_id)) {
                    next(new InvalidIdError_1.InvalidIdError());
                }
                updatedReimbursement = {
                    reimbursement_id: reimbursement_id,
                    author: author,
                    amount: amount,
                    date_submitted: new Date(),
                    date_resolved: new Date(),
                    description: description,
                    resolver: req.session.user.user_id,
                    status: status,
                    type: type
                };
                updatedReimbursement.author = author;
                updatedReimbursement.amount = amount;
                updatedReimbursement.description = description;
                updatedReimbursement.status = status;
                updatedReimbursement.type = type;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reim_dao_1.updateExistingReimbursement(updatedReimbursement)];
            case 2:
                updatedReimResults = _b.sent();
                res.json(updatedReimResults);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                next(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=reim-router.js.map