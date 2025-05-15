import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(cookieParser());

app.use("/api", authRoutes); // Use the auth routes
app.use("/api", taskRoutes); // Use the auth routes

export default app;
