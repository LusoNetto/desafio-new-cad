import { Request, Response, Router } from 'express';
import flights from '../utils/flights.json';

const route = Router();

route.get('/', (_: Request, res: Response) => {
    try {
        res.status(200).json(flights);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default route;
