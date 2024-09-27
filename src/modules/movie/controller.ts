import { statusCodes } from "../../utils/status";
import { ICreateMovie } from "./dto";
import { MovieEntity } from "./entity/movie.entity";
import MovieService from "./service";
import { Request, Response } from "express";

const movieService = new MovieService();

const controllers = {
  create: async (req: Request, res: Response) => {
    const dto = req.body as ICreateMovie;
    const file = req.file; 
    const imageUrl = file ? `/uploads/${file.filename}` : undefined;

    try {
      const result = await movieService.create({ dto, imageUrl });
      const response = new MovieEntity(result).serialize();
      res.status(statusCodes.PROCESSED || 201).json(response);
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
