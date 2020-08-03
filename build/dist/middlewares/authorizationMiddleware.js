"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleWare = void 0;
/*
user has different roles and their rights are different
all users cannot access all of the functionalities of the application
different permission levels

Employees in the company can
*login
*submit requests for reimbursement
*view their past tickets and pending requests.

Finance managers can
*log in
*view
all reimbursement requests and past history for all employees
 Finance managers are
authorized to
*approve and
*deny
requests for expense reimbursement
*/
function authorizationMiddleWare(roles) {
    return function (req, res, next) {
        var authorized = false;
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            if (req.session.user.role === role) {
                authorized = true;
                next();
            }
        }
        if (!authorized) {
            res.status(403).send('You are not authorized to perform this action');
        }
    };
}
exports.authorizationMiddleWare = authorizationMiddleWare;
//# sourceMappingURL=authorizationMiddleware.js.map