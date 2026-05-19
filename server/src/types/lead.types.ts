import { Types } from 'mongoose';

export enum LeadStatus{
    New = 'New',
    Contacted = 'Contacted',
    Qualified = 'Qualified',
    Lost = 'Lost',
}

export enum LeadSource{
    Website = "Website",
    Instagram = 'Instagram',
    Referral = 'Referral',
}

export interface ILead{
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    createdBy: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LeadQuery{
    status?: LeadStatus;
    source?: LeadSource;
    createdBy?: Types.ObjectId;
    $or?: Array<{name?: RegExp; email?: RegExp }>;
}

export interface PaginatedLeads{
    date: ILead[];
    total: number;
    page: number;
    totalPages: number;
}