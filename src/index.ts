import  express, { Response, Request, NextFunction } from 'express';
import { loggingMiddleware } from './middlewares/login-middleware';
import { sessionMiddleware } from './middlewares/session-middlewate';
import { reimRouter } from './routers/reim-router';
import { userRouter } from './routers/user-router';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { getUserByUsernameAndPassword } from './daos/user-dao';



const app = express();

app.use(express.json())
// custom middleware to run on all request

app.use(loggingMiddleware)

//session middleware to track connections to our server
app.use(sessionMiddleware)

app.use('/reimbursement', reimRouter)  // redirect all request on /reimbursement to the reimRouter
app.use('/users', userRouter) // middleware to direct all requests on /users to the router

app.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        throw new InvalidCredentialsError()
    } else {
        try {
            let user = await getUserByUsernameAndPassword(username, password)
            req.session.user = user //  add user data to the session so, we can use that data in other requests
            res.json(user)
        }catch (e){
            next(e)
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
