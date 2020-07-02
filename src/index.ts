import  express from 'express';
import { reimRouter } from './routers/reim-router';
import { userRouter } from './routers/user-router';





const app = express();

app.use(express.json())
//app.use(loggingMiddleware)
//app.use(sessionMiddleware)
//app.use(authenticationMiddleware) asks for username and password 
// custom middleware to run on all request
app.use('/reimbursements', reimRouter)
app.use('/users', userRouter)

/*
app.post('/login', (req:Request, res:Response)=>{
    let username = req.body.username
    let password = req.body.password
    if(!username || !password){
        res.status(401).send('Please enter a valid usurname and password')
    }else{
        for(const user of users){
            if(user.username === username && user.password ===password){
                req.session.user = user   // adding the user to that session/so they can perform action as a specific user
                res.json(user)
            }else {
                throw new AuthFailureError()
            }
        }
    }
})

*/




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
