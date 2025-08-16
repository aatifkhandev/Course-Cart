const {Router} = require('express')

const userRouter = Router()


userRouter.get('/purchases',(req,res)=>{
res.json({
    message:"sign-up"
})
})

userRouter.post('/signup',(req,res)=>{
res.json({
    message:"sign-up"
})
})

userRouter.post('/signin',(req,res)=>{
res.json({
    message:"sign-up"
})
})

module.exports = {
    userRouter:userRouter 
}