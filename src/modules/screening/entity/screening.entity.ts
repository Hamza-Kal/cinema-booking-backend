import { pick } from "lodash";
import { IScreening } from "../db/model";  // Importing the IScreening model interface

export interface IScreeningEntity {
  _id: string;
  name:string;
  movie_id: string;
  cinema_hall_id: string;
  start_time: Date;
  end_time: Date;
  available_seats: string[]; 
  total_seats: number;
  created_at: Date;
  updated_at: Date;
}

export class ScreeningEntity {
  private _id: string;
  private name: string;
  private movie_id: string;
  private cinema_hall_id: string;
  private start_time: Date;
  private end_time: Date;
  private available_seats: string[];
  private total_seats: number;
  private created_at: Date;
  private updated_at: Date;

  constructor(screening: IScreening) {
    Object.assign(
      this,
      pick(screening, [
        "_id",
        "name",
        "movie_id",
        "cinema_hall_id",
        "start_time",
        "end_time",
        "available_seats",
        "total_seats",
        "created_at",
        "updated_at",
      ])
    );
  }

  serialize(): IScreeningEntity {
    return {
      _id: this._id,
      name:this.name,
      movie_id: this.movie_id,
      cinema_hall_id: this.cinema_hall_id,
      start_time: this.start_time,
      end_time: this.end_time,
      available_seats: this.available_seats,
      total_seats: this.total_seats,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
