import  express, {Request, Response } from 'express';
import { reimRouter } from './routers/reim-router';
import { userRouter } from './routers/user-router';


const app = express();

app.use(express.json())
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
