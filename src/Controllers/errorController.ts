import { Error } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import AppError from '../util/appError';

const handleValidationError = (error: Error.ValidationError) => {
    const messages = []
    for (const key in error.errors)
        messages.push(error.errors[key].message);

    return new AppError(messages.join(' '), 400);
}
const sendError = (error: any, res: Response) => {
    if (error.isOperational)
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    else
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };
    error.message = err.message;
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (error.errors) error = handleValidationError(error);

    sendError(error, res);
};