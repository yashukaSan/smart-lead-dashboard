import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;
const EXPIRES = process.env.JWT_EXPIRES_IN ?? '7d';

export const signToken = (payload: JwtPayload): string => {
    const options: any = { expiresIn: EXPIRES };
    return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, SECRET) as JwtPayload;
    } catch {
        return null;
    }
};