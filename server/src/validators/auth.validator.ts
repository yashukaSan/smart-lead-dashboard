import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidation = (req:Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(e => e.msg),
        });
        return;
    };
}


export const validateRegister = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password minimum leangth should be more than 6'),
    body('role').optional().isIn(['admin','sales']).withMessage('Role must be either Admin or Sales'),
    handleValidation,
];

export const validateLogin = [
    body('email').isEmail().withMessage('Valid Email required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidation,
]