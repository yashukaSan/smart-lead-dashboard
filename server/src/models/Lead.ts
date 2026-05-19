// name: string
// email: string
// status: "New" | "Contacted" | 'Qualified' | 'Lost'
// source: 'Website' | 'Instagram' | 'Referral'
// createdBy: ObjectId
// createdAt: Date

import mongoose, { Schema, Document} from 'mongoose';
import { ILead, LeadStatus, LeadSource } from '../types/lead.types';

export interface ILeadDocument extends ILead, Document {}

const LeadSchema = new Schema<ILeadDocument>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    status: {type: String, enum: Object.values(LeadStatus), default: LeadStatus.New,},
    source: {type: String, enum: Object.values(LeadSource), required: true,},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true,},
}, { timestamps: true });

LeadSchema.index({ name: 'text', email: 'text' });
LeadSchema.index({ status: 1, source: 1, createdAt: -1});

export default mongoose.model<ILeadDocument>('Lead', LeadSchema);