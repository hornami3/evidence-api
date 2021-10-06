import { Request, Response, NextFunction } from 'express';
import AstronautModel from '../Models/astronautModel';
import catchAsync from '../util/catchAsync';
import AppError from '../util/appError';

export const getAllAstronauts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const astronauts = await AstronautModel.find();

    return res.status(200).json({
        status: 'success',
        length: astronauts.length,
        data: {
            astronauts
        }
    });
});

export const getAstronaut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const astronaut = await AstronautModel.findById(req.params.id);

    if (!astronaut)
        return next(new AppError('There is no astronaut with this ID', 404));
    
    return res.status(200).json({
        status: 'success',
        data: {
            astronaut
        }
    });
});

export const deleteAstronaut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const astronaut = await AstronautModel.findByIdAndDelete(req.params.id);

    if (!astronaut)
        return next(new AppError('There is no astronaut with this ID', 404));

    res.status(204).json({
        status: 'success',
        data: null
    });
});

export const updateAstronaut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const astronaut = await AstronautModel.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });

    if (!astronaut)
        return next(new AppError('There is no astronaut with this ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            astronaut
        }
    });
});

export const createAstronaut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const astronaut = await AstronautModel.create(req.body);

    return res.status(201).json({
        status: 'success',
        data: {
            astronaut
        }
    });
});