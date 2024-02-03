import express, { json } from "express";
import cors from "cors";
import { DOMAIN_ACEPTED, PORT } from "./config.js";

const app = express();

app.use(
  cors({
    origin: DOMAIN_ACEPTED,
  })
);

app.use(json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
