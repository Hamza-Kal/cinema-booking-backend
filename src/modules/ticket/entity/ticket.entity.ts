import { pick } from "lodash";
import { ITicket } from "../db/model"; // Importing the IScreening model interface

export interface ITicketEntity {
  _id: string;
  screeningId: string;
  seatId:string;
  userId:string;
}
