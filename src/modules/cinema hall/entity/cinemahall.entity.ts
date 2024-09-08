import { pick } from "lodash";
import { ICinemaHall } from "../db/model";

export interface ICinemaHallEntity {
  _id: string;
  hall_name: string;
  total_seats: number;
  location: string;
}

export class CinemaHallEntity {
  private _id: string;
  private hall_name: string;
  private total_seats: number;
  private location: string;
  constructor(cinemaHall: ICinemaHall) {
    Object.assign(
      this,
      pick(cinemaHall, ["_id", "hall_name", "total_seats", "location"])
    );
  }
  serialize(): ICinemaHallEntity {
    return {
      _id: this._id,
      hall_name: this.hall_name,
      total_seats: this.total_seats,
      location: this.location,
    };
  }
}
