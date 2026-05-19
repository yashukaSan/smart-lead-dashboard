import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const uri = process.env.MONGO_URI;
    if(!uri) throw new Error("MONGO_URI not set in .env file ");

    await mongoose.connect(uri);
    console.log('MongoDB Connected');
};

export default connectDB;