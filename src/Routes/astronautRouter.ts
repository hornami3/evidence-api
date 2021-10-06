import express from 'express';
import * as astronautController from '../Controllers/astronautController';

const router = express.Router();

router
    .route('/')
    .get(astronautController.getAllAstronauts)
    .post(astronautController.createAstronaut);

router
    .route('/:id')
    .get(astronautController.getAstronaut)
    .patch(astronautController.updateAstronaut)
    .delete(astronautController.deleteAstronaut);

export default router;