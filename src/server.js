import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import router  from './routes/index';


const app=express();
dotenv.config();
app.use(bodyParser.json());

app.use("/api/v1",router)

const port=process.env.PORT
const db=process.env.DATABASE
//configure our server
const startserver=()=>{
   
    app.listen(port)

    
    
}
//configure database

const con=()=>{
    mongoose.connect(db,{
        // useNewurlparser:true,
        useUnifiedTopology:true
    })

  
}

Promise.all([con(),startserver()]).then(()=>{
    console.log('Database successfull connected');
    console.log(`port running on .... ${port}`)


}).catch((err)=>{
    console.log(`database error....${err}`)
})
export default app