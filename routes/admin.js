import {Router} from 'express'
const AdminRouter  = Router()
import bcrypt from 'bcrypt'
import {adminModel, courseModel} from "../db.js"
import { JWT_ADMIN_PASSWORD } from '../config.js'

import {z} from 'zod'

import jwt from 'jsonwebtoken'
import { adminMiddleWare } from '../middlewares/adminMiddleWare.js'

AdminRouter.post('/signup',async(req,res)=>{

   const signUpSchema = z.object({
    email : z.string().email({message:"invalid email format"}),
    password: z.string().min(6,{message:"at least 6 characters"}),
     firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" })
})


    try{
    const parsedData = signUpSchema.parse(req.body)
    const {email,password,firstName,lastName } = parsedData

    const hashedPassword = await bcrypt.hash(password,10)

    await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
    
res.json({
    message:"sign-up succeeded"
})
    } catch(error){
       if( error instanceof z.ZodError){
        return res.status(400).json({
            message:"validation failed",
            errors:error.errors,
        })
       }
        console.error("Signup error:", error);
    res.status(500).json({
      message: "Something went wrong during signup",
    })
}
})





AdminRouter.post('/signin',async(req,res)=>{
const schema = z.object({
    email: z.string().email({ message: "email is invalid" }),
    password: z.string().min(6, { message: "at least 6 characters" }),
  })

  try {
    // ✅ 1. Input validation
    const parsedData = schema.parse(req.body)
    const { email, password } = parsedData

    // ✅ 2. Fetch user by email only
    const admin = await adminModel.findOne({ email: email })
    if (!admin) {
      return res.status(403).json({ message: "incorrect credentials" })
    }

    // ✅ 3. Password check
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return res.status(403).json({ message: "incorrect credentials" })
    }

    // Generate token if valid
    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD)
    return res.json({ token })

  } catch (error) {
    // ✅ 6. Error handling
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "validation failed",
        errors: error.errors,
      })
    }

    console.error("Signin error:", error)
    return res.status(500).json({ message: "Something went wrong during signin" })
  }
})



AdminRouter.post('/course', adminMiddleWare,async(req,res)=>{
  
  const adminId = req.userId

  const{title,description , imageUrl ,price} = req.body
    
  const course = await courseModel.create({
       title:title,
       description:description,
       imageURL:imageUrl,
       creatorId:adminId,
       price:price
  })


res.json({
    message:"course created",
    courseId : course._id
})
})

AdminRouter.put('/course',adminMiddleWare,async(req,res)=>{
 const adminId = req.userId

  const{title,description , imageUrl ,price,courseId} = req.body
    
     

  const course = await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
  },{
       title:title,
       description:description,
       imageURL:imageUrl,
       price:price
  })


res.json({
    message:"course updated",
    courseId : course._id
})
})


AdminRouter.get('/course/bulk',adminMiddleWare,async(req,res)=>{
const adminId = req.userId

    
  const courses = await courseModel.find({
      creatorId:adminId 
  });


res.json({
    message:"course updated",
    courses
})
})

export {
    AdminRouter
}