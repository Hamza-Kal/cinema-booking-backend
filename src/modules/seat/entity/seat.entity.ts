import { pick } from "lodash";
import { ISeat } from "../db/model";  // Importing the ISeat model interface

export interface ISeatEntity {
  _id: string;
  seat_number: number;
  row: number;
  is_available: boolean;
  cinema_hall_id: string;  
}

export class SeatEntity {
  private _id: string;
  private seat_number: number;
  private row: number;
  private is_available: boolean;
  private cinema_hall_id: string;  

  constructor(seat: ISeat) {
    Object.assign(
      this,
      pick(seat, ["_id", "seat_number", "row", "is_available", "cinema_hall_id"])
    );
  }

  serialize(): ISeatEntity {
    // This method returns a serialized version of the seat object
    return {
      _id: this._id,
      seat_number: this.seat_number,
      row: this.row,
      is_available: this.is_available,
      cinema_hall_id: this.cinema_hall_id,
    };
  }
}
