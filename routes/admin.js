import {Router} from 'express'
const AdminRouter  = Router()
import bcrypt from 'bcrypt'
import {adminModel} from "../db.js"

const JWT_ADMIN_PASSWORD = "12121adfg"

import {z} from 'zod'

import jwt from 'jsonwebtoken'

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

export {
    AdminRouter
}