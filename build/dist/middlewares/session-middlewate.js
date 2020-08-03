"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
var express_session_1 = __importDefault(require("express-session"));
var sessionConfig = {
    secret: 'secret',
    cookie: {
        secure: false
    },
    resave: false,
    saveUninitialized: false
};
exports.sessionMiddleware = express_session_1.default(sessionConfig);
/*
session is factory function
config is the option
it returns a function in the form of (req, res, next)
*/
//# sourceMappingURL=session-middlewate.js.map