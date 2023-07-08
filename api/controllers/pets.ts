import axios from '../middleware/authentication';
import { Request, Response } from 'express';

export const getPets = async(req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`${process.env.PETFINDER_API_BASE_URL}/animals`, {
          // params: {
          //   location: 'your_location',
          //   type: 'dog', // or 'cat' for cats
          // },
        });
    
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };