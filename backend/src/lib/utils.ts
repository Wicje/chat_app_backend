import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) =>{

//Create a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })

    //Send in cookies
    res.cookie("jwt", token, {
        maxAge: 7 *24 * 60 *60 *1000, //mili seconds
        httpOnly, //Prevent XSS attacks cross- site Scripting attacks
        sameSite:"strict", // CSRF attacks
        secure:process.env.NODE_ENV !=="development"
    })

    return token;

}