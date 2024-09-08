import { statusCodes } from "../../utils/status";
import { ICreateCinemaHall } from "./dto";
import { CinemaHallEntity } from "./entity/cinemahall.entity";
import CinemaHallService from "./service";
import { Request, Response } from "express";

const cinemaHallService = new CinemaHallService();

const controllers = {
  create: async (req: Request, res: Response) => {
    const dto = req.body as ICreateCinemaHall;
    try {
      const result = await cinemaHallService.create({ dto });
      const response = new CinemaHallEntity(result).serialize();
      res.status(statusCodes.PROCESSED || 201).json(response); // Use 201 if PROCESSED is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const result = await cinemaHallService.getAll();
      res.status(statusCodes.OK || 200).json(result);
    } catch (error) {
      res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error });
    }
  },
};
export default controllers;