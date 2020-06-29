import  express, { request, Response, Request } from 'express';
import { reimRouter } from './routers/reim-router';
//import { userRouter } from './routers/user-router';
import { loggingMiddleware } from './middlewares/login-middleware';
import { sessionMiddleware } from './middlewares/session-middlewate';
import { InvalidUsernameError } from './errors/InvalidUsernameError';
import { InvalidPasswordError } from './errors/InvalidPasswordError';
import { InvalidIdError } from './errors/InvalidIdError';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import {userRouter, users } from './routers/user-router';
import { AuthFailureError } from './errors/AuthFailureError';


const app = express();

app.use(express.json())
// custom middleware to run on all request
app.use(loggingMiddleware)
//session middleware to track connections to our server
app.use(sessionMiddleware)

app.use('/reimbursement', reimRouter)  // redirect all request on /reimbursement to the reimRouter
app.use('/users', userRouter) // middleware to direct all requests on /users to the router

app.post('/login', (req:Request, res:Response)=>{
    let username = req.body.username
    let password = req.body.password
    if(!username && password){
        throw new InvalidCredentialsError;
    } else {
        let IsExist = false;
        for(const user of users){
            if(user.username === username && user.password === password){
                //after someone logs in sending them to them their user info
                req.session.user = user
                res.json(user)
                IsExist = true;        
            } 
        }
        if(!IsExist){
            throw new AuthFailureError()
        }
    }
        
    
})







app.use((err, req, res, next) =>{
    if(err.statusCode) {
        res.status(err.statusCode).send(err.message)
    }else {
        console.log(err)
        res.status(500).send("Oops Something went wrong")
    }
});

app.listen(2006, ()=>{
    console.log('Server has started');
})
