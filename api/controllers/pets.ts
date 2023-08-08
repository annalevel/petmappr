import axios from '../middleware/authentication';
import { Request, Response } from 'express';

/*
Get pets matching a specified species, gender, and location
*/
export const getPets = async(req: Request, res: Response) => {
    try {
        const userParameters = req.query;
        const sanitizedParameters: any = {};

        if (userParameters.species == "dog" || userParameters.species == "cat") {
          sanitizedParameters.type = userParameters.species;
        }
        if (userParameters.gender == "male" || userParameters.gender == "female") {
          sanitizedParameters.gender = userParameters.gender;
        }
        if (userParameters.location !== undefined && userParameters.location !== null) {
          sanitizedParameters.location = userParameters.location;
        }

        const { data } = await axios.get(`${process.env.PETFINDER_API_BASE_URL}/animals`, {
          params: sanitizedParameters
        });
    
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error has occurred.' });
      }
    };