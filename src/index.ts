import  express, { NextFunction, Request, Response } from 'express';
import { reimRouter } from './routers/reim-router';
import { userRouter } from './routers/user-router';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { getUserByusernameAndPassword } from './daos/user-dao';
import { loggingMiddleware } from './middlewares/logging-middleware';
import { sessionMiddleware } from './middlewares/session-middlewate';






const app = express();

app.use(express.json())
app.use(loggingMiddleware)
app.use(sessionMiddleware)
//app.use(authenticationMiddleware) //asks for username and password 
// custom middleware to run on all request
app.use('/reimbursements', reimRouter)
app.use('/users', userRouter)


app.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        //res.status(401).send('Please enter a valid usurname and password')
        throw new InvalidCredentialsError();
    }else{
        try {
            let user = await getUserByusernameAndPassword(username, password)
            req.session.user = user // adding user data to the session
            //so we can use that data for other requests 
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
})






app.use((err, req, res, next) =>{
    if(err.statusCode){
        res.status(err.statusCode).send(err.message)
    }else {
        console.log(err)
        res.status(500).send("Oppps something went wrong")
    }
})

app.listen(2006, ()=>{
    console.log('Server has started');
})
