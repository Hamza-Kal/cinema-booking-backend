import express, { Application, Request, Response, NextFunction } from "express";
import movieRouter from "./modules/movie/route";
import dotenv from "dotenv";
import { errorHandler } from "./utils/error";
import seatRouter from "./modules/seat/route";
import cinemaHallRouter from "./modules/cinema hall/route";
import userRouter from "./modules/user/route";
const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(errorHandler);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/cinemaHalls", cinemaHallRouter);
app.use("/api/seat", seatRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

export default app;
