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
exports.submitNewUser = exports.UpdateOnExistingUser = exports.getUserByusernameAndPassword = exports.findUserById = exports.getAllUsers = void 0;
var _1 = require(".");
var UsersDTOConvertors_1 = require("../../utils/UsersDTOConvertors");
var UserNotFoundError_1 = require("../../errors/UserNotFoundError");
var AuthFailureError_1 = require("../../errors/AuthFailureError");
var UserMissingInputError_1 = require("../../errors/UserMissingInputError");
//Promise is representation of a future value of an error
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var client, getAllUsers_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select u.user_id, \n        u.username,  \n        u.\"password\", u.first_name, \n        u.last_name, u.email, u.image,\n        r.\"role\" , r.role_id\n        from employee_data.users u  left join employee_data.roles r on u.\"role\" = r.role_id;")];
                case 2:
                    getAllUsers_1 = _a.sent();
                    return [2 /*return*/, getAllUsers_1.rows.map(UsersDTOConvertors_1.UsersDTOtoUsersConvertor)];
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
exports.getAllUsers = getAllUsers;
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, getUserById, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select u.username,  \n        u.\"password\", u.first_name, \n        u.last_name, u.email, u.image,\n        r.\"role\" , r.role_id\n        from employee_data.users u  left join employee_data.roles r on u.\"role\" = r.role_id \n        where u.user_id = $1;", [id])];
                case 2:
                    getUserById = _a.sent();
                    if (getUserById.rowCount === 0) {
                        throw new Error('User not found');
                    }
                    else {
                        // because there will be one object
                        return [2 /*return*/, UsersDTOConvertors_1.UsersDTOtoUsersConvertor(getUserById.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    if (error_2.message === 'User not found') {
                        throw new UserNotFoundError_1.UserNotFound();
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
exports.findUserById = findUserById;
function getUserByusernameAndPassword(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var client, getUserById, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select u.user_id, u.username,  \n        u.\"password\", u.first_name, \n        u.last_name, u.email, u.image,\n        r.\"role\" , r.role_id\n        from employee_data.users u  left join employee_data.roles r on u.\"role\" = r.role_id \n        where u.username = $1 and u.password = $2;", [username, password])];
                case 2:
                    getUserById = _a.sent();
                    if (getUserById.rowCount === 0) {
                        throw new Error('User not found');
                    }
                    else {
                        // because there will be one object
                        return [2 /*return*/, UsersDTOConvertors_1.UsersDTOtoUsersConvertor(getUserById.rows[0])];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    if (error_3.message === 'User not found') {
                        throw new AuthFailureError_1.AuthFailureError();
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
exports.getUserByusernameAndPassword = getUserByusernameAndPassword;
function UpdateOnExistingUser(updatedUser) {
    return __awaiter(this, void 0, void 0, function () {
        var client, role_id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 19, 20, 21]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _a.sent();
                    if (!updatedUser.username) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.query('update employee_data.users set username = $1 where user_id = $2;', [updatedUser.username, updatedUser.user_id])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!updatedUser.password) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.query('update employee_data.users set password = $1 where user_id = $2;', [updatedUser.password, updatedUser.user_id])];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!updatedUser.first_name) return [3 /*break*/, 8];
                    return [4 /*yield*/, client.query('update employee_data.users set first_name = $1 where user_id = $2;', [updatedUser.first_name, updatedUser.user_id])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!updatedUser.last_name) return [3 /*break*/, 10];
                    return [4 /*yield*/, client.query('update employee_data.users set last_name= $1 where user_id = $2;', [updatedUser.last_name, updatedUser.user_id])];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    if (!updatedUser.email) return [3 /*break*/, 12];
                    return [4 /*yield*/, client.query('update employee_data.users set email = $1 where user_id = $2;', [updatedUser.email, updatedUser.user_id])];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    if (!updatedUser.email) return [3 /*break*/, 14];
                    return [4 /*yield*/, client.query('update employee_data.users set image = $1 where user_id = $2;', [updatedUser.image, updatedUser.user_id])];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    if (!updatedUser.role) return [3 /*break*/, 17];
                    return [4 /*yield*/, client.query('select r.role_id from employee_data.roles r  where r.role = $1;', [updatedUser.role])];
                case 15:
                    role_id = _a.sent();
                    if (role_id.rowCount === 0) {
                        throw new Error('Role not found');
                    }
                    role_id = role_id.rows[0].role_id;
                    return [4 /*yield*/, client.query('update employee_data.users set "role"= $1 where user_id = $2;', [role_id, updatedUser.user_id])];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17: return [4 /*yield*/, client.query('COMMIT;')];
                case 18:
                    _a.sent();
                    return [2 /*return*/, findUserById(updatedUser.user_id)];
                case 19:
                    error_4 = _a.sent();
                    client && client.query('ROLLBACK;'); // if any error occurs send it back
                    if (error_4.message === 'Role not found') {
                        throw new Error('Role not found');
                    }
                    console.log(error_4);
                    throw new Error('Unhandled Error');
                case 20:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 21: return [2 /*return*/];
            }
        });
    });
}
exports.UpdateOnExistingUser = UpdateOnExistingUser;
function submitNewUser(newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var client, role_id, newuserinfo, _a, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, 8, 9]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _b.sent();
                    return [4 /*yield*/, client.query('BEGIN;')];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, client.query("select r.role_id from employee_data.roles r where r.\"role\" = $1;", [newUser.role])];
                case 3:
                    role_id = _b.sent();
                    if (role_id.rowCount === 0) {
                        throw new Error('Role not found');
                    }
                    role_id = role_id.rows[0].role_id;
                    return [4 /*yield*/, client.query("insert into employee_data.users(\"username\", \n            \"password\",\n            \"first_name\",\n            \"last_name\",\n            \"email\", \"image\", \"role\") values ($1, $2, $3, $4, $5, $6, $7) returning \"user_id\" ", [newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.email, newUser.image, role_id])];
                case 4:
                    newuserinfo = _b.sent();
                    _a = newUser;
                    return [4 /*yield*/, newuserinfo];
                case 5:
                    _a.user_id = (_b.sent()).rows[0].user_id;
                    return [4 /*yield*/, client.query('COMMIT;')];
                case 6:
                    _b.sent();
                    return [2 /*return*/, newUser];
                case 7:
                    error_5 = _b.sent();
                    client && client.query('ROLLBACK;');
                    if (error_5.message === 'Role not found') {
                        throw new UserMissingInputError_1.UserMissingInputError;
                    }
                    console.log(error_5);
                    throw new Error('un implemented error handling');
                case 8:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.submitNewUser = submitNewUser;
//# sourceMappingURL=user-dao.js.map