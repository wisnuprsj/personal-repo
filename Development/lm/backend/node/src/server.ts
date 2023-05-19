import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

export default app;
