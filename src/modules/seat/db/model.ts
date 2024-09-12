import mongoose, { Document, Schema } from "mongoose";

export interface ISeat extends Document {
  seat_number: number;
  row: number;
  is_available: boolean;
  cinema_hall_id: mongoose.Schema.Types.ObjectId;  // Foreign key to CinemaHall
}

const seatSchema: Schema = new Schema<ISeat>({
  seat_number: {
    type: Number,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  is_available: {
    type: Boolean,
    required: true,
    default: false,
  },
  cinema_hall_id: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,  
  },
});

const Seat = mongoose.model<ISeat>('Seat', seatSchema);
export default Seat;
