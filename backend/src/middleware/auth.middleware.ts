import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

interface jwtPayload {
    id: string;
}

//Extend Request to user
declare global {
    namespace express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    //Check for cookies in header
    if (req.cookies?.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.header.authorization.split("")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, No token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayload;

        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({
            message: "Not Authorzed, User not found"
        });
    } catch (error: any) {
        console.error("Auth middleware Error ", error.message);
        res.status(401).json({
            message: "Not Authorizd, no token"
        });
    }
};
