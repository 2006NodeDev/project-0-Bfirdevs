import  express, { NextFunction, Request, Response } from 'express';
import { reimRouter } from './routers/reim-router';
import { userRouter } from './routers/user-router';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { getUserByusernameAndPassword } from './daos/SQL/user-dao';
import { loggingMiddleware } from './middlewares/logging-middleware';
import { sessionMiddleware } from './middlewares/session-middlewate';
import { corsFilter } from './middlewares/cors-filter';
import { UserMissingInputError } from './errors/UserMissingInputError';
import { Users } from './models/Users';
import { SubmitNewUserService } from './services/user-service';



const app = express();

app.use(express.json({limit:'50mb'}))
app.use(loggingMiddleware)
app.use(corsFilter)

app.use(sessionMiddleware)

//app.use(authenticationMiddleware) //asks for username and password 
// custom middleware to run on all request
app.use('/reimbursements', reimRouter)
app.use('/users', userRouter)
app.get('/health', (req:Request, res:Response)=>{
    res.sendStatus(200)
})

app.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        //res.status(401).send('Please enter a valid username and password')
        next (new InvalidCredentialsError())
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

userRouter.post('/', async (req:Request, res:Response , next: NextFunction)=>{
    let {username, password, first_name, last_name, email, role, image } = req.body 
    if (! username || !password || !first_name || !last_name || !email || !role || !image){
        next(UserMissingInputError)
    }else {
        let newUser: Users = {
            user_id :0, 
            username,
            password,
            first_name,
            last_name,
            email,
            role,
            image
        }
        try {
            let submitReim = await SubmitNewUserService(newUser)
            res.json(submitReim)
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
