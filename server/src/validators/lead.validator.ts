import { body, validationResult } from  'express-validator';
import { Request, Response, NextFunction } from 'express';
import { LeadStatus, LeadSource } from '../types/lead.types';

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array().map(e => e.msg),
        });
        return;
    }
    next();
};

export const validateLead = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('status').isIn(Object.values(LeadStatus)).withMessage('Invalid Status'),
    body('source').isIn(Object.values(LeadSource)).withMessage('Invalid Source'),
    handleValidation,
];
