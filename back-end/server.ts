import express from 'express';
import app from "./src/app";

const PORT = 3000;
const server = express();

server.use("/api", app);

server.listen(PORT, () => {
  console.log("Back-end running on port", PORT)
});