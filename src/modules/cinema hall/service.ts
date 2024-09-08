import CinemaHall from "./db/model";
import { ICreateCinemaHall } from "./dto";
import { CinemaHallErrors } from "./error-services";
import mongoose from "mongoose";

class CinemaHallService {
  private cinemaHallErrors: CinemaHallErrors;
  constructor() {
    this.cinemaHallErrors = new CinemaHallErrors();
  }
  private async findByName(hall_name: string, throwError?: boolean) {
    const cinemaHall = await CinemaHall.findOne({ hall_name });
    if (!cinemaHall && throwError) {
      throw this.cinemaHallErrors.notFound();
    }
    return cinemaHall;
  }
  async create({
    dto,
  }: {
    dto: ICreateCinemaHall;
    session?: mongoose.mongo.ClientSession;
  }) {
    const existingUser = await this.findByName(dto.hall_name);
    if (existingUser) {
      throw this.cinemaHallErrors.alreadyExists();
    }
    const cinemaHall = new CinemaHall(dto);
    return await cinemaHall.save();
  }
  async getAll() {
    const cinemaHalls = await CinemaHall.find({});
    if (!cinemaHalls || cinemaHalls.length === 0) {
      throw this.cinemaHallErrors.notFound();
    }
    return cinemaHalls;
  }
}

export default CinemaHallService;
