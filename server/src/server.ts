import 'dotenv/config';
import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT ?? 5000;

const start = async () => {
    await connectDB();
    app.listen(PORT, ()=>{
        console.log('Server is running on the port ', PORT);
    });
};

start().catch(err =>{
    console.error("Start up Failed:", err.message);
    process.exit(1);
});