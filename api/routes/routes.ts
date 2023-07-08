import { Application } from 'express';
import * as pets from '../controllers/pets';

export const attachRoutes = (app: Application): void => {
    app.get('/api/v1/pets', pets.getPets);
};