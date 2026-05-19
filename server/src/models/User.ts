// name: string
// email: string (unique)
// password: string (hashed)
// role: "admin" | "sales"
// createdAt: Date

import mongoose, {Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from  '../types/user.types';

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, minLength:6, maxLength: 18},
    role: {type: String, enum: ['admin', 'sales'], default: 'sales' },
}, { timestamps: true});

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10),
    next();
});

UserSchema.methods.comparePassword = async function (
    candiate: string
):Promise<boolean>{
    return bcrypt.compare(candidate, this.password);
};

UserSchema.set('toJSON',{
    transfomr: (_doc, ret) => { delete ret.password; return ret; }
});

export default mongoose.model<IUserDocument>('User', UserSchema);