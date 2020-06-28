import session, { SessionOptions } from 'express'  

const sessionConfig:SessionOptions = {
    secret: 'secret',
    cookie:{
        secure:false
    },
    resave:false,
    saveUninitialized:false
}
export const sessionMiddleware = session(sessionConfig)
