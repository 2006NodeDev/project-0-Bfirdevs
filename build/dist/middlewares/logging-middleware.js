"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
function loggingMiddleware(req, res, next) {
    console.log(req.method + " Request from " + req.ip + " to " + req.path + " ");
    next();
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging-middleware.js.map