import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors({origin: process.env.CLIENT_URL ?? '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('./health', (_req,res) => res.json({ status: 'ok' } ));

app.use('./api/auth', authRoutes);
app.use('./app/leads', leadRoutes);

app.use(errorHandler);

export default app;