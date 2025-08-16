const express = require('express')
const { userRouter } = require('./routes/user')
const { courseRouter } = require('./routes/course')
const { AdminRouter } = require('./routes/admin')
const app = express()
const port = 3000


app.use('/user',userRouter)
app.use('/course',courseRouter)
app.use('/admin',AdminRouter)


app.get('/course/purchase',(req,res)=>{
res.json({
    message:"sign-up"
})
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
})