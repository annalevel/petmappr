import axios from '../middleware/authentication';
import { Request, Response } from 'express';

/*
Get pets matching a specified species, gender, and location
*/
export const getPets = async(req: Request, res: Response) => {
    try {
        const userParams = req.query;
        const cleanParams: any = {};

        if (userParams.species == "dog" || userParams.species == "cat") {
          cleanParams.type = userParams.species;
        }
        if (userParams.gender == "male" || userParams.gender == "female") {
          cleanParams.gender = userParams.gender;
        }
        if (userParams.location !== undefined && userParams.location !== null) {
          if (userParams.location.toString().match(/^-?[\d]*(\.[\d]*)?,-?[\d]*(\.[\d]*)?$/)) {
            cleanParams.location = userParams.location.toString();
          }
        }
        
        const { data } = await axios.get(`${process.env.PETFINDER_API_BASE_URL}/animals`, {
          params: cleanParams
        });
    
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error has occurred.' });
      }
    };