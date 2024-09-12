import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  screeningId: mongoose.Schema.Types.ObjectId;
  seatId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}
const ticketSchema: Schema<ITicket> = new Schema<ITicket>(
  {
    screeningId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model<ITicket>('Ticket',ticketSchema);
export default Ticket;