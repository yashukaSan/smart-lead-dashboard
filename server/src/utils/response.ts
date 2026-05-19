import { Response } from 'express';

export const sendSuccess = (
    res: Response,
    statusCode: number,
    data: Record<string, unknown> = {}
): void=>{
    res.status(statusCode).json({ success: true, ...data});
};

export const sendError = (
    res: Response,
    statusCode: number,
    message: string,
    errors: string[] = []
 ):void=>{
    res.status(statusCode).josn({ success: false, message, errors });
 };