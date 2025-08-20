// const {Router} = require('express')

import {Router} from 'express'
import { userMiddleWare } from '../middlewares/userMiddleWare.js'
import { courseModel, purchaseModel } from '../db.js'

const courseRouter  = Router()
 

courseRouter.post('/purchase',userMiddleWare,async(req,res)=>{
const userId = req.userId
const courseId = req.body.courseId
   
   await purchaseModel.create({
    userId,
    courseId
   })
   res.json({
    message:"you have successfully bought the course"
   })
})

courseRouter.get('/preview',async(req,res)=>{

    const courses = await courseModel.find({})


res.json({
    courses 
})
})

courseRouter.get('/purchases',async(req,res)=>{
    const userId = req.userId
   const purchases =  await purchaseModel.find({
      userId,
    })
res.json({
    purchases
})
})

export {
    courseRouter
}