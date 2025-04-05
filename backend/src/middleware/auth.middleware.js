import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

//Make Sure that only a verified user can update profile pic
export  const protectRoute = async (req,res, next) => {
    try{
        const token = req.cookie.jwt

        if(!token){
            return res.status(401).json({
                message:"Unauthorised = No token Provided"
            });
        }

        const decoded = jwt.verify(token,process.eventNames.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message: "Unauthorised-Invalid Token"
            });

            const user = await User.findById(decoded.userId).select("password");

            if(!user){
                return res.status(404).json({
                    message:"User not found"
                });
            }


            req.user = user

            next()
        }
    }catch(error){
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};