import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';

import astronautRouter from './Routes/astronautRouter';
import errorController from './Controllers/errorController';
import AppError from './util/appError';

const app: Application = express();

// CORS
const corsMiddleware = cors();
app.use(corsMiddleware);
app.options('*', corsMiddleware);

app.use(helmet());

// limiter
const limiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: 'Too many request from this IP, please try it again in 15 minutes'
});
app.use('/api', limiter);

// body parser
app.use(express.json({ limit: '10kb' }));

// query injection
app.use(mongoSanitize());

// comprossion
app.use(compression());

// routes
app.use('/api/v1/astronauts', astronautRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

export default app;