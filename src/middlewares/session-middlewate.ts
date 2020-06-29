import session, { SessionOptions } from 'express'  

const sessionConfig:SessionOptions= {
    secret: 'secret',
    cookie:{
        secure:false
    },
    resave:false,
    saveUninitialized:false
}
/*
session is factory function
config is the option
it returns a function in the form of (req, res, next)
*/
export const sessionMiddleware = session(sessionConfig) 
