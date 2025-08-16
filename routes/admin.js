const {Router} = require('express')

const AdminRouter  = Router()



AdminRouter.post('/signup',(req,res)=>{
res.json({
    message:"sign-up"
})
})

AdminRouter.post('/signin',(req,res)=>{
res.json({
    message:"sign-up"
})
})


module.exports = {
    AdminRouter:AdminRouter
}