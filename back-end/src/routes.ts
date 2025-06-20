import { Router } from "express";
import flightRoute from "./routes/flightRoute";

const route = Router();

route.use("/flights", flightRoute);

export default route;