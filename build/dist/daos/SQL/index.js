"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
var pg_1 = require("pg");
/*
"Important: A process gets envrmnt variables when it starts
if you make envr variable while vscode/gitbash is running, it does not get the envr variable
you have to restart  vscode/git-bash
*/
//entrypoint for all of the database files
exports.connectionPool = new pg_1.Pool({
    host: process.env['LB_HOST'],
    user: process.env['LB_USER'],
    password: process.env['LB_PASSWORD'],
    database: process.env['LB_DATABASE'],
    port: 5432,
    max: 5 // max number of connections 
});
//# sourceMappingURL=index.js.map