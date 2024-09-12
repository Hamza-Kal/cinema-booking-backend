import { pick } from "lodash";
import { ITicket } from "../db/model"; // Importing the IScreening model interface

export interface ITicketEntity {
  _id: string;
  screeningId: string;
  seatId: string;
  userId: string;
}
export class TicketEntity {
  private _id: string;
  private screeningId: string;
  private seatId: string;
  private userId: string;

  constructor(ticket: ITicket) {
    Object.assign(
      this,
      pick(ticket, [
        "_id",
        "screeningId",
        "seatId",
        "userId",
        "created_at",
        "updated_at",
      ])
    );
  }

  serialize(): ITicketEntity {
    return {
      _id: this._id,
      screeningId: this.screeningId,
      seatId: this.seatId,
      userId: this.userId,
    };
  }
}
