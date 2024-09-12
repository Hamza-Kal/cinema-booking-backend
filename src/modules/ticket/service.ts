import { TicketErrors } from "./error-services";
import mongoose from "mongoose";
import Screening from "../screening/db/model";
import User from "../user/db/model";
import Ticket from "./db/model";
import { Types } from "mongoose";

class TicketService {
  private ticketErrors: TicketErrors;

  constructor() {
    this.ticketErrors = new TicketErrors();
  }

  async createTicket({
    screeningId,
    userId,
    seatId,
  }: {
    screeningId: string;
    userId: string;
    seatId: string;
  }) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const screening = await Screening.findById(screeningId).session(session);
      if (!screening) {
        throw this.ticketErrors.screeningNotFound();
      }

      const user = await User.findById(userId).session(session);
      if (!user) {
        throw this.ticketErrors.userNotFound();
      }

      const existingTicket = await Ticket.findOne({
        screeningId,
        userId,
      }).session(session);
      if (existingTicket) {
        throw this.ticketErrors.ticketAlreadyExists();
      }

      const seatObjectId = new Types.ObjectId(seatId);
      const seatIndex = screening.available_seats.findIndex(
        (seat) => seat.toString() === seatObjectId.toString()
      );

      if (seatIndex === -1) {
        throw this.ticketErrors.seatUnavailable();
      }

      screening.available_seats.splice(seatIndex, 1);

      await screening.save({ session });

      const newTicket = new Ticket({
        screeningId,
        userId,
        seatId: seatObjectId,
      });
      await newTicket.save({ session });

      await session.commitTransaction();

      session.endSession();

      return {
        message: "Ticket created successfully",
        ticket: newTicket,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  }

  async getAllTickets() {
    try {
      const tickets = await Ticket.find().exec();
      return tickets;
    } catch (error) {
      throw new Error("Error retrieving tickets: " + error.message);
    }
  }

  async getTicketsByUserId(userId: string) {
    try {
      const tickets = await Ticket.find({ userId }).exec();
      if (tickets.length === 0) {
        throw this.ticketErrors.ticketNotFoundForUser();
      }
      return tickets;
    } catch (error) {
      throw new Error("Error retrieving tickets for user: " + error.message);
    }
  }
}

export default TicketService;
