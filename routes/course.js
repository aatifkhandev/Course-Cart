const {Router} = require('express')

const courseRouter  = Router()


courseRouter.get('/preview',(req,res)=>{
res.json({
    message:"sign-up"
})
})

courseRouter.get('/courses',(req,res)=>{
res.json({
    message:"sign-up"
})
})

module.exports = {
    courseRouter:courseRouter
}