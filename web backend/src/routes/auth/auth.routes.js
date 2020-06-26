import { Router } from "express";
import { check } from "express-validator";
import authBodyvalidator from "../../../middlewares/auth/authBodyValidator";
import bcrypt from "bcryptjs";
import gravatar from "gravatar"
import { model } from "mongoose";
import jwt from 'jsonwebtoken'

const User = model("users")





const router = Router();
const authValidator=[
    check("email","Enter a valid email address").isEmail(),
    check("password","Password must be at least 6 characters").isLength({
        min:6
    })
]


//register
router.post("/register",authValidator,authBodyvalidator,async(req,res)=>{

    try {
    let{email,password} = req.body

    const user  = await User.findOne({email});
    if(user){
        return res.status(400).json({error:[{msg:'Email is already taken ,please another email'}]});
    }

   
    const image = gravatar.url(email,{
        s:"200",
        r:"pg",
        d:"mm"
    })
   

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);
   
    const newUser = new User({email,password,image})
    await newUser.save()

    return res.status(200).json(newUser);
}catch(err){
    console.error(err.message);
    return res.status(500).json({errors:[{msg:"internal server Error"}]});
}
});


//Login 
router.post("/login",authValidator,authBodyvalidator,async(req,res)=>{
   try{
      const{email,password} = req.body

      const user  = await User.findOne({email});
      if(!user){
          return res.status(400).json({error:[{msg:'No user Found on that email'}]});
      }
      const isPasswordMatched = await bcrypt.compare(password,user.password)
      if(!isPasswordMatched){
        return res.status(400).json({error:[{msg:'Invalid Password'}]});
      }
         const payload ={
             email:user.email,
             image:user.image,
             _id:user._id
         };

         jwt.sign(payload,"jwtsecret",{expiresIn:60*60*24},(err,token)=>{
             if(err){
                return res.status(400).json({error:[{msg:'some thing went wrong please try again'}]});
             }
             return res.status(200).json(token);
         });

   }catch(err){
    console.error(err.message);
    return res.status(500).json({errors:[{msg:"internal server Error"}]});
   }
});
export default router;


