import express, { Application, Request, Response } from "express";
import movieRouter from "./modules/movie/route";
import dotenv from "dotenv";
import { errorHandler } from "./utils/error";
import seatRouter from "./modules/seat/route";
import cinemaHallRouter from "./modules/cinema hall/route";
import userRouter from "./modules/user/route";
import screeningRouter from "./modules/screening/route";
import ticketRouter from "./modules/ticket/route";
import cors from "cors";  // Import CORS

const app: Application = express();

dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000', 'http://main--booking-cinmea-damas.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  
}));

app.use(express.json());
app.use(errorHandler);

app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

app.use("/api/cinemaHalls", cinemaHallRouter);
app.use("/api/seat", seatRouter);
app.use("/api/screening", screeningRouter);
app.use("/api/ticket", ticketRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

export default app;
