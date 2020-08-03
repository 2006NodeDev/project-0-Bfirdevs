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
var express_1 = __importDefault(require("express"));
var reim_router_1 = require("./routers/reim-router");
var user_router_1 = require("./routers/user-router");
var logging_middleware_1 = require("./middlewares/logging-middleware");
var session_middlewate_1 = require("./middlewares/session-middlewate");
var cors_filter_1 = require("./middlewares/cors-filter");
var InvalidCredentialsError_1 = require("./errors/InvalidCredentialsError");
var user_dao_1 = require("./daos/SQL/user-dao");
var index_1 = require("./messaging/index");
require("./event-listeners/new-user");
var app = express_1.default();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(logging_middleware_1.loggingMiddleware);
app.use(cors_filter_1.corsFilter);
console.log(index_1.userTopic);
app.use(session_middlewate_1.sessionMiddleware);
//app.use(authenticationMiddleware) //asks for username and password 
// custom middleware to run on all request
app.use('/reimbursements', reim_router_1.reimRouter);
app.use('/users', user_router_1.userRouter);
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
app.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                if (!(!username || !password)) return [3 /*break*/, 1];
                //res.status(401).send('Please enter a valid username and password')
                next(new InvalidCredentialsError_1.InvalidCredentialsError());
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_dao_1.getUserByusernameAndPassword(username, password)];
            case 2:
                user = _a.sent();
                req.session.user = user; // adding user data to the session
                //so we can use that data for other requests 
                res.json(user);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.use(function (err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).send(err.message);
    }
    else {
        console.log(err);
        res.status(500).send("Oppps something went wrong");
    }
});
app.listen(2006, function () {
    console.log('Server has started');
});
//# sourceMappingURL=index.js.map