
import session, { SessionOptions } from 'express-session'

const sessionConfig:SessionOptions = {
    secret: 'secret', // needs to be updated
    cookie:{
        secure:false
    },
    resave:false,
    saveUninitialized:false
}

export const sessionMiddleware = session(sessionConfig)
/*
session is factory function
config is the option
it returns a function in the form of (req, res, next)
*/

