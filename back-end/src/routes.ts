import { Router } from "express";
import flightRoute from "./routes/flightRoute";
import bookmarksRoute from "./routes/bookmarksRoute";

const route = Router();

route.use("/flights", flightRoute);
route.use("/bookmarks", bookmarksRoute);

export default route;