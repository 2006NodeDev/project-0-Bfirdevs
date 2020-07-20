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

app.post('/',  async (req: Request, res: Response, next: NextFunction) => {
    // get input from the user
    let { first_name, last_name, username, password, email, role, image } = req.body//a little old fashioned destructuring
    //verify that input
    if (!first_name || !last_name || !username || !password || !role) {
        next(new UserMissingInputError)
    } else {
        //try  with a function call to the dao layer to try and save the user
        let newUser: Users = {
            first_name,
            last_name,
            username,
            password,
            role,
            user_id:0,
            email,
            image,
        }
        newUser.email = email || null
        try {
            let savedUser = await SubmitNewUserService(newUser)
            res.json(savedUser)// needs to have the updated userId
        } catch (e) {
            next(e)
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
