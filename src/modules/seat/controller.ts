import { statusCodes } from "../../utils/status";
import { ICreateSeat } from "./dto";
import { SeatEntity } from "./entity/seat.entity";
import SeatService from "./service";
import { Request, Response } from "express";

const seatService = new SeatService();

const controllers = {
  create: async (req: Request, res: Response) => {
    const dto = req.body as ICreateSeat;
    try {
      const result = await seatService.create({ dto });
      const response = new SeatEntity(result).serialize();
      res.status(statusCodes.PROCESSED || 201).json(response); // Use 201 if PROCESSED is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const result = await seatService.getAll();
      res.status(statusCodes.OK || 200).json(result);
    } catch (error) {
      res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error });
    }
  },
  getSeatsByCinemaHallId: async (req: Request, res: Response) => {
    try {
      const cinemaHallId = req.params.id;
      const seatDtos = await seatService.getSeatsByCinemaHallId(cinemaHallId);
      if (seatDtos.length === 0) {
        return res
          .status(404)
          .json({ message: "No seats found for this cinema hall." });
      }
      res.status(200).json(seatDtos);
    } catch (error) {
      res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error });
    }
  },
};

export default controllers;
