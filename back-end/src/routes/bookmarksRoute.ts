import { Request, Response, Router } from "express";
import { client } from "../../redisServer";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  try {
    const bookmarks: string | null = await client.get('bookmarks');
    if(bookmarks) {
      res.status(200).send(JSON.parse(bookmarks));
    } else {
      res.status(200).send({});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

route.post('/', async (req : Request, res : Response) => {
  try {
    if (
      !req.body.flightId
    ) {
      res.status(400).send({
        message: `Send all requestuire fields: flightId`,
      });
    };
    const flightId = req.body.flightId;
    const sevenDaysInSeconds = 604800;
    const bookmarks = await client.get('bookmarks');
    console.log("bookmarks:", bookmarks);
    let bookmarksObject = {};
    if(bookmarks){
      bookmarksObject = JSON.parse(bookmarks);
      bookmarksObject[flightId] = flightId;
    }
    
    const bookmarksToCache = JSON.stringify(bookmarksObject);

    await client.set('bookmarks', bookmarksToCache, {
        EX: sevenDaysInSeconds
    });

    res.status(201).send(flightId);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

// route.delete('/:id', async (req : Request, res : Response) => {
//   try {
//     const { id } = req.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     return res.status(200).send({ message: 'Book deleted successfylly' });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// })



export default route;