import {Router} from 'express'
import bcrypt from 'bcrypt'
import {parse, z} from 'zod'
import { courseModel, purchaseModel, userModel } from '../db.js'
import jwt from 'jsonwebtoken'
import { JWT_USER_PASSWORD } from '../config.js'
import { userMiddleWare } from '../middlewares/userMiddleWare.js'


const userRouter = Router()

const signUpSchema = z.object({
    email : z.string().email({message:"invalid email format"}),
    password: z.string().min(6,{message:"at least 6 characters"}),
     firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" })
})




userRouter.post('/signup',async (req,res)=>{
     
    try{
    const parsedData = signUpSchema.parse(req.body)
    const {email,password,firstName,lastName } = parsedData

    const hashedPassword = await bcrypt.hash(password,10)

    await userModel.create({
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


userRouter.post('/signin', async (req, res) => {
  const schema = z.object({
    email: z.string().email({ message: "email is invalid" }),
    password: z.string().min(6, { message: "at least 6 characters" }),
  })

  try {
    // ✅ 1. Input validation
    const parsedData = schema.parse(req.body)
    const { email, password } = parsedData

    // ✅ 2. Fetch user by email only
    const user = await userModel.findOne({ email: email })
    if (!user) {
      return res.status(403).json({ message: "incorrect credentials" })
    }

    // ✅ 3. Password check
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(403).json({ message: "incorrect credentials" })
    }

    // Generate token if valid
    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD)
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





userRouter.get('/purchases',userMiddleWare,async(req,res)=>{
   const userId = req.userId
   const purchases =  await purchaseModel.find({
      userId,
    })
    let purchasedCoursesId = []
    for(let i=0;i<purchases.length;i++){
       purchasedCoursesId.push(purchases[i].courseId)
    }
    const coursesData = await courseModel.find({
      _id:{$in:purchasedCoursesId}
   
      //  _id:{$in:purchases.map(x=>x.courseId)}

    })
res.json({
    purchases,
    coursesData
})
})




export {
    userRouter
}







