const express = require('express')
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const { AdminRouter } = require('./routes/admin')
const app = express()
const port = 3000


app.use('/user',userRouter)
app.use('/course',courseRouter)
app.use('/admin',AdminRouter)


async function main(){
   await mongoose.connect("mongodb+srv://aatifk:aatifk2001@cluster0.ji8obbw.mongodb.net/Course-Cart")
   app.listen(port,()=>{
       console.log(`listening on ${port}`);
       
   })
}

main()