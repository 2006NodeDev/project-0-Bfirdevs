import  express from 'express';
import { reimRouter } from './routers/reim-router';
import { userRouter } from './routers/user-router';
import { loggingMiddleware } from './middlewares/login-middleware';


const app = express();

app.use(express.json())
// custom middleware to run on all request
app.use(loggingMiddleware)

app.use('/reimbursement', reimRouter)  // redirect all request on /reimbursement to the reimRouter
app.use('/users', userRouter)


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
