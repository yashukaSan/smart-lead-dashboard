// Register: validate input → check duplicate email → hash password with bcrypt → save user → return JWT
// Login: find user → compare password → return JWT + user info
// Me: return current user from token

import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { signToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { RegisterBody, LoginBody } from '../types/user.types';

export const register = async(
    req: Request<{}, {}, RegisterBody>,
    res: Response,
    next: NextFunction
)=>{
    try{
        const {name, email, password, role } = req.body;
        const exists = await User.findOne({ email });
        if(exists) return sendError(res, 409, "Email already Exists");

        const user = await User.create({ name, email, password, role });
        const token = signToken({ id: user.id, role: user.role });
        sendSuccess(res, 201, { token, user });
    }catch(err){ next(err); }
};

export const login = async(
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if(!user) return sendError(res, 401, 'Invalid credentials');

        const match = await user.comparePassword(password);
        if(!match) return sendError(res, 401, 'Invalid credentials');

        const token = signToken({ id: user.id, role: user.role });
        sendSuccess(res, 200, { token , user });
    }catch(err){ next(err); }
};

export const getMe = async(
    req: Request, res: Response, next: NextFunction
)=>{
    try{
        const user = await User.findById(req.user?.id);
        if(!user) return sendError(res, 404, 'User not found' );
        sendSuccess(res, 200, { user });
    }catch(err){ next(err); }
};