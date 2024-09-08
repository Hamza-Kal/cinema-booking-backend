import { statusCodes } from "../../utils/status";
import { ICreateMovie } from "./dto";
import { MovieEntity } from "./entity/movie.entity";
import MovieService from "./service";
import { Request, Response } from "express";

const movieService = new MovieService();
const controllers = {
  create: async (req: Request, res: Response) => {
    const dto = req.body as ICreateMovie;
    try {
      const result = await movieService.create({ dto });
      const response = new MovieEntity(result).serialize();
      res.status(statusCodes.PROCESSED || 201).json(response); // Use 201 if PROCESSED is invalid
    } catch (error) {
      res
        .status(statusCodes.SERVICE_UNAVAILABLE || 500)
        .json({ error: error.message });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const result = await movieService.getAll();
      res.status(statusCodes.OK || 200).json(result);
    } catch (error) {
      res.status(statusCodes.SERVICE_UNAVAILABLE || 500).json({ error });
    }
  },
};

export default controllers;
