import { Request, Response, Router } from 'express';
import { client } from '../../redisServer';

const route = Router();

route.get('/', async (req: Request, res: Response) => {
    try {
        const bookmarks: string | null = await client.get('bookmarks');
        if (bookmarks) {
            res.status(200).send(JSON.parse(bookmarks));
        } else {
            res.status(200).send({});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

route.post('/', async (req: Request, res: Response) => {
    try {
        const flightId = req.body.flightId;
        if (!flightId) {
            res.status(400).send({
                message: `Send all requestuire fields: flightId`,
            });
        }
        if (typeof flightId !== 'number') {
            res.status(400).send({
                message: `FlightId must be a number but is ${typeof flightId}`,
            });
        }
        const sevenDaysInSeconds = 604800;
        const bookmarks = await client.get('bookmarks');
        let bookmarksObject = {};
        if (bookmarks) {
            bookmarksObject = JSON.parse(bookmarks);
            if (!bookmarksObject[flightId]) {
                bookmarksObject[flightId] = flightId;
            } else {
                res.status(400).send({
                    message: `Bookmarks cache with id ${flightId} already created`,
                });
            }
        }

        const bookmarksToCache = JSON.stringify(bookmarksObject);

        await client.set('bookmarks', bookmarksToCache, {
            EX: sevenDaysInSeconds,
        });

        res.status(201).send(flightId);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

route.delete('/:flightId', async (req: Request, res: Response) => {
    try {
        const { flightId } = req.params;

        if (!flightId) {
            res.status(400).send({
                message: `Send all requestuire params: flightId`,
            });
        }

        const bookmarks = await client.get('bookmarks');
        let bookmarksObject = {};
        if (bookmarks) {
            bookmarksObject = JSON.parse(bookmarks);
            const result = bookmarksObject[flightId];
            if (result) {
                delete bookmarksObject[flightId];
                console.log(bookmarksObject);
                const bookmarksToCache = JSON.stringify(bookmarksObject);
                client.set('bookmarks', bookmarksToCache);
                res.status(200).send({ message: 'Book deleted successfylly' });
            } else {
                res.status(404).json({
                    message: `Not found book with id ${flightId}`,
                });
            }
        } else {
            res.status(404).json({ message: 'bookmarks cache not found' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default route;
