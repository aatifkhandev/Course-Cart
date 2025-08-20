require('dotenv').config()
const express = require('express')
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const { AdminRouter } = require('./routes/admin')
const app = express()
const port = 3000
const mongoose = require('mongoose')

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