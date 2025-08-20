import 'dotenv/config'
console.log(process.env.MONGO_URL);

import express from 'express'
import  {courseRouter} from './routes/course.js'
import {AdminRouter} from './routes/admin.js'
import { userRouter } from "./routes/user.js";
const app = express()
const port = 3000
import {mongoose} from 'mongoose'

app.use(express.json())
app.use('/user',userRouter)
app.use('/course',courseRouter)
app.use('/admin',AdminRouter)


async function main(){
   await mongoose.connect(process.env.MONGO_URL)
   console.log("Connected to mongo");
   
   app.listen(port,()=>{
       console.log(`listening on ${port}`);
       
   })
}

main()