const {Router} = require('express')

const AdminRouter  = Router()

const adminModel = require("../db")

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


AdminRouter.post('/course',(req,res)=>{
res.json({
    message:"sign-up"
})
})

AdminRouter.put('/course',(req,res)=>{
res.json({
    message:"sign-up"
})
})

AdminRouter.get('/course/bulk',(req,res)=>{
res.json({
    message:"sign-up"
})
})

module.exports = {
    AdminRouter:AdminRouter
}