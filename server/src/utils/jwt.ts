const SECRET = process.env.JWT_SECRET!;
const EXPIRES = process.env.JWY_EXPIRES_IN ?? '7d';

export const signToken = (payload: JwtPayLoad): string => jwt.sign(payload, SECRET, {expiresIn: EXPIRES });

export const varifyToken = (token: string): JwtPayLoad | null => {
    try{
        return jwt.verify(token, SECRET) as JwtPayload;
    }catch{
        return null;
    }
};