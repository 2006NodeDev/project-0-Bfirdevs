"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
function authenticationMiddleware(req, res, next) {
    if (!req.session.user) {
        res.status(401).send('Please login');
    }
    else {
        console.log("user " + req.session.user.username + " has a role of " + req.session.user.role);
        next();
    }
}
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authentication-middleware.js.map