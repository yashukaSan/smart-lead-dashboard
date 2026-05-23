// GET /api/leads — Advanced Filtering Logic:
// Query params: status, source, search, sort, page, limit

// Build dynamic Mongoose query object
// search → regex on name OR email
// sort: latest → -createdAt, oldest → createdAt
// Pagination: skip = (page - 1) * limit, limit = 10
// Return: { data, total, page, totalPages }

// Role rules:

// admin → sees all leads
// sales → sees only their own leads (createdBy: req.user._id)

// DELETE:

// admin only (use authorizeRoles('admin'))

// Apply same filters as list endpoint
// Use json2csv or manual CSV string builder
// Set headers: Content-Type: text/csv, Content-Disposition: attachment

import { Request, Response, NextFunction } from 'express';
import { ILead, LeadQuery, LeadStatus, LeadSource } from '../types/lead.types.js';
import { Lead } from '../models/Lead.js';
import { leadsToCSV } from '../utils/csvExport.js';
import { sendSuccess } from '../utils/response.js';
import { Types } from 'mongoose';

  export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
    const { status, source, search, sort, page = 1, limit = 10 } = req.query;
    const query: LeadQuery = {};

    if (req.user?.role === 'sales') query.createdBy = new Types.ObjectId(req.user.id as string);
    if (status) query.status = status as LeadStatus;
    if (source) query.source = source as LeadSource;
    if (search) {
      const re = new RegExp(search as string, 'i');
      query.$or = [{ name: re }, { email: re }];
    }

    const sortOrder = sort === 'oldest' ? 'createdAt' : '-createdAt';
    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      Lead.find(query).sort(sortOrder).skip(skip).limit(Number(limit)),
      Lead.countDocuments(query),
    ]);

    sendSuccess(res, 200, {
      data,
      pagination: { total, page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)) }
    });
  };

  export const createLead = async (req: Request, res: Response, next: NextFunction) => {
    const lead = await Lead.create({ ...req.body, createdBy: new Types.ObjectId(req.user?.id as string) });
    sendSuccess(res, 201, { lead });
  };

  export const exportCSV = async (req: Request, res: Response, next: NextFunction) => {
    const { status, source, search } = req.query;
    const query: LeadQuery = {};
    if (req.user?.role === 'sales') query.createdBy = new Types.ObjectId(req.user.id as string);
    if (status) query.status = status as LeadStatus;
    if (source) query.source = source as LeadSource;
    if (search) {
      const re = new RegExp(search as string, 'i');
      query.$or = [{ name: re }, { email: re }];
    }
    const leads = await Lead.find(query).lean();
    const csv = leadsToCSV(leads as ILead[]);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition',
      'attachment; filename="leads.csv"');
    res.send(csv);
  };

  export const getLead = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    sendSuccess(res, 200, { lead });
  };

  export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    sendSuccess(res, 200, { lead });
  };

  export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    sendSuccess(res, 200, { message: 'Lead deleted successfully' });
  };