import mongoose from "mongoose";
import Seat from "../seat/db/model";
import Screening from "./db/model";
import { ICreateScreening } from "./dto";
import { ScreeningErrors } from "./error-service";

class ScreeningService {
  private screeningErrors: ScreeningErrors;
  constructor() {
    this.screeningErrors = new ScreeningErrors();
  }

  private async findByName(name: string, throwError?: boolean) {
    const screening = await Screening.findOne({ name });
    if (!screening && throwError) {
      throw this.screeningErrors.notFound();
    }
    return screening;
  }
  private async findByCinemaStartOrEndDate(
    start_time: Date,
    end_time: Date,
    cinema_hall_id: string
  ) {
    const screening = await Screening.findOne({
      cinema_hall_id,
      $or: [
        { start_time: { $lt: end_time, $gte: start_time } },
        { end_time: { $gt: start_time, $lte: end_time } },
      ],
    });
    return screening;
  }

  async create({
    dto,
  }: {
    dto: ICreateScreening;
    session?: mongoose.mongo.ClientSession;
  }) {
    const existingScreening = await this.findByName(dto.name);
    if (existingScreening) {
      throw this.screeningErrors.alreadyExists;
    }
    const overlappedScreening = await this.findByCinemaStartOrEndDate(
      dto.start_time,
      dto.end_time,
      dto.cinema_hall_id
    );
    if (overlappedScreening) {
      throw this.screeningErrors.overlappingScreening();
    }
    const screening = new Screening(dto);
    return await screening.save();
  }
  async getAll() {
    const screenings = await Screening.find({});
    if (!screenings || screenings.length === 0) {
      throw this.screeningErrors.notFound();
    }
    return screenings;
  }

  async getSeats(screeningId: string) {
    const screening = await Screening.findById(screeningId);
    if (!screening) {
      throw this.screeningErrors.notFound();
    }

    const availableSeats = await Seat.find({
      _id: { $in: screening.available_seats },
    });

    return availableSeats;
  }
}
export default ScreeningService;
