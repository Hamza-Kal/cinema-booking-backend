import ScreeningService from "./service";

import { Request, Response } from "express";
import { ICreateScreening } from "./dto";
import { ScreeningEntity } from "./entity/screening.entity";
import { statusCodes } from "../../utils/status";

const screeningService = new ScreeningService();

const controllers = {
  create: async (req: Request, res: Response) => {
    const dto = req.body as ICreateScreening;

    try {
      const result = await screeningService.create({ dto });
      const response = new ScreeningEntity(result).serialize();
      res.status(statusCodes.PROCESSED || 201).json(response); // Use 201 if PROCESSED is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const result = await screeningService.getAll();

      res.status(statusCodes.OK || 200).json(result); // Use 201 if PROCESSED is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
  getSeats: async (req: Request, res: Response) => {
    try {
      const { screeningId } = req.params;  // Extract screeningId from request params
     console.log(screeningId);
      const result = await screeningService.getSeats(screeningId);

      res.status(statusCodes.OK || 200).json(result); // Use 201 if PROCESSED is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
};
export default controllers;
