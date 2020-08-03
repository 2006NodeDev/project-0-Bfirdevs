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
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var InvalidIdError_1 = require("../errors/InvalidIdError");
var AuthenticationFailure_1 = require("../errors/AuthenticationFailure");
//import { authenticationMiddleware } from '../middlewares/authentication-middleware';
var user_service_1 = require("../services/user-service");
var UserMissingInputError_1 = require("../errors/UserMissingInputError");
exports.userRouter = express_1.default.Router();
//userRouter.use(authenticationMiddleware)
exports.userRouter.get('/', authorizationMiddleware_1.authorizationMiddleWare(['Finance Manager', 'Admin']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var getAllusers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_service_1.getAllUsersService()];
            case 1:
                getAllusers = _a.sent();
                res.json(getAllusers);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.get('/:id', authorizationMiddleware_1.authorizationMiddleWare(['Finance Manager', 'Admin', 'User']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userById, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!isNaN(+id)) return [3 /*break*/, 1];
                res.status(400).send('Id must be a number');
                return [3 /*break*/, 5];
            case 1:
                if (!(req.session.user.user_id !== +id && req.session.user.role === "User")) return [3 /*break*/, 2];
                next(new AuthenticationFailure_1.AuthenticationFailure());
                return [3 /*break*/, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user_service_1.findUserByIdService(+id)];
            case 3:
                userById = _a.sent();
                res.json(userById);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Update User / Allowed Admin // For Project 1 user can also update his/her own info
exports.userRouter.patch('/', authorizationMiddleware_1.authorizationMiddleWare(['Admin', 'User']), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_id, username, password, first_name, last_name, email, role, image, updatedUser, updateResults, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_id = _a.user_id, username = _a.username, password = _a.password, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, role = _a.role, image = _a.image;
                if (!(!user_id || isNaN(req.body.user_id))) return [3 /*break*/, 1];
                next(new InvalidIdError_1.InvalidIdError());
                return [3 /*break*/, 6];
            case 1:
                if (!(req.session.user.user_id !== +user_id && req.session.user.role === "User")) return [3 /*break*/, 2];
                next(new AuthenticationFailure_1.AuthenticationFailure());
                return [3 /*break*/, 6];
            case 2:
                updatedUser = {
                    user_id: user_id,
                    username: username,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    role: role,
                    image: image
                };
                updatedUser.username = username || undefined;
                updatedUser.password = password || undefined;
                updatedUser.first_name = first_name || undefined;
                updatedUser.last_name = last_name || undefined;
                updatedUser.email = email || undefined;
                updatedUser.role = role || undefined;
                updatedUser.image = image || undefined;
                console.log(updatedUser);
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, user_service_1.UpdateOnExistingUserService(updatedUser)];
            case 4:
                updateResults = _b.sent();
                res.json(updateResults);
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.userRouter.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, last_name, username, password, email, role, image, newUser, savedUser, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body //a little old fashioned destructuring
                , first_name = _a.first_name, last_name = _a.last_name, username = _a.username, password = _a.password, email = _a.email, role = _a.role, image = _a.image;
                if (!(!first_name || !last_name || !username || !password || !role)) return [3 /*break*/, 1];
                next(new UserMissingInputError_1.UserMissingInputError);
                return [3 /*break*/, 5];
            case 1:
                newUser = {
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    password: password,
                    role: role,
                    user_id: 0,
                    email: email,
                    image: image,
                };
                newUser.email = email || null;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, user_service_1.SubmitNewUserService(newUser)];
            case 3:
                savedUser = _b.sent();
                res.json(savedUser); // needs to have the updated userId
                return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                next(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=user-router.js.map