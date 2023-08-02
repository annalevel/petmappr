import { Application } from 'express';
import * as pets from '../controllers/pets';
require('dotenv').config();

export const attachRoutes = (app: Application): void => {
    app.get('/api/v1/pets', pets.getPets);
};