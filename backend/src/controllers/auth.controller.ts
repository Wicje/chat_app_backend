

import { Request, Response } from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';


const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });
};
/////////////////////////////

//Signup of Userdev/
export const signup = async (req: Response, res: Response) => {
    const { email, password } = req.body;
    try {
        //check if email, password is provided
        if (!email || !password) {
            return res.status(400)
                .json({ message: "All fields are required" });
        }
        //Check if password up to standard
        if (password.length < 6) {
            return res.status(400)
                .json({ message: "Password must be atleast 6 characters" });
        }

        const userExists = await User.findOne({ email })

        if (userExists) return res.status(400)
            .json({ message: "Email already exists" });

        //Create New User
        const newUser = await User.create({ email, password });
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: geerateToken(user._id.toString())
        });

    else {
    res.status(400).json({ message: "Invalid user data" });
}
    }catch (error) {
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({ message: "internal Server Error" });
}

};

//SignIn
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        //Validate if user email exist in database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });  //Invalid credential
            //so as to confuse malicious users on whether it is password of email
        }

        //Validate if password exist in DB
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id.toString());

        //Set as http cookie
        res.cookie("token", token, {
            httpOnly: True,
            secure: process.env.NODE_ENV === "production",///only used in Production
            sameSite: "Strict",
            maxAge:60*24*60*60*1000
        });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            token
        });
    } catch (error:any) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//NOt worked on this yet:
export const logout = async (req, res) => {

    const

    try {
        //Check if user is Logged
        try {
            const user = await User.findOne({ email });

            if (isLoggedIn) {
                return /// Continue from here
            }
        }
    }

};




export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.body);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({
            message: Internal Server errrrrror"});
  }
};
