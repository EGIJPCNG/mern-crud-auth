import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies (as sent by API clients)

app.use("/api", authRoutes); // Use the auth routes

export default app;
