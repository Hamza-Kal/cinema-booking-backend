import mongoose from "mongoose";
import Seat, { ISeat } from "./db/model";
import { ICreateSeat } from "./dto";
import { SeatEntity } from "./entity/seat.entity";
import { SeatErrors } from "./error-service";

class SeatService {
  private seatErrors: SeatErrors;
  constructor() {
    this.seatErrors = new SeatErrors();
  }
  private async findByNumber(seat_number: Number, throwError?: boolean) {
    const cinemaHall = await Seat.findOne({ seat_number });
    if (!cinemaHall && throwError) {
      throw this.seatErrors.notFound();
    }
    return cinemaHall;
  }
  async create({
    dto,
  }: {
    dto: ICreateSeat;
    session?: mongoose.mongo.ClientSession;
  }) {
    const existingSeat = await this.findByNumber(dto.seat_number);
    if (existingSeat) {
      throw this.seatErrors.alreadyExists();
    }
    const seat = new Seat(dto);
    return await seat.save();
  }
  async getAll() {
    const seats = await Seat.find({});
    if (!seats || seats.length === 0) {
      throw this.seatErrors.notFound();
    }
    return seats;
  }
  async getSeatsByCinemaHallId(cinemaHallId: string): Promise<ICreateSeat[]> {
    const seats = await Seat.find({ cinema_hall_id: cinemaHallId });
    if (!seats || seats.length === 0) {
      return [];
    }
    const seatDTOs: ICreateSeat[] = seats.map((seat) =>
      new SeatEntity(seat).serialize()
    );
    return seatDTOs;
  }
}
export default SeatService;
