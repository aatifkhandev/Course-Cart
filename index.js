const express = require('express')
const app = express()
const port = 3000


app.post('/user/signup',(req,res)=>{
res.json({
    message:"sign-up"
})
})

app.post('/user/signin',(req,res)=>{
res.json({
    message:"sign-up"
})
})

app.get('/courses',(req,res)=>{
res.json({
    message:"sign-up"
})
})

app.get('/user/courses',(req,res)=>{
res.json({
    message:"sign-up"
})
})

app.get('/course/purchase',(req,res)=>{
res.json({
    message:"sign-up"
})
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);
    
})