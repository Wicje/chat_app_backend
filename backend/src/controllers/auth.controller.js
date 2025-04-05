import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js'

//Signup
export const signup = async (req, res) =>{
    const {fullName,email,password} = req.body
try{
    //check if FullName, email, password is provided
    if (!fullName ||!email || !password){
        return res.status(400)
        .json({message: "All fields are required"});
    }
    //Check if password up to standard
    if (password.length <6){
        return res.status(400)
        .json({message: "Password must be atleast 6 characters"});
    }

    const user = await User.findOne({email})

    if (user) return res.status(400)
        .json({message: "Email already exists"});

   //Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create New User
    const newUser = new User({
            fullName:newUser.fullName,
            email: newUser.email,
            profilePic:newUser.profilePic,
        });
    }else {
        res.status(400).json({message:"Invalid user data"});
    }
}catch(error){
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({message: "internal Server Error"});
}
};

//SignIn
export const login = async (req, res) => {
    const {email, password } = req.body
    try{
        //Validate if user email exist in database
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});  //Invalid credential
            //so as to confuse malicious users on whether it is password of email
        }

        //Validate if password exist in DB
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};


export const logout = (req, res) => {
    
};

export const updateProfile = async (req, res) => {
    try{
        const{profilePic} = req.body;
        const userId = req.body._id;

        if(!profilePic){
            return res.status(400).json(
                message: "Profile Pic is Required"
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePice:uploadResponse.secure_url}, { new:true})

        res.status(200).json(updatedUser)
    }catch(error){
        console.log("error in profile update");
        res.status(500)({
            message:"Internal server error"
        });
    }
};



export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.body);
  }catch(error){
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({message:Internal Server errrrrror"});
  }
};    
