import mongoose, { Document, Schema } from "mongoose";

export interface ICinemaHall extends Document {
  hall_name: string;
  total_seats: number;
  location: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
const cinemaHallSchema: Schema = new Schema<ICinemaHall>(
  {
    hall_name: {
      type: String,
      required: true,
      unique: true,
    },
    total_seats: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CinemaHall = mongoose.model<ICinemaHall>('CinemaHall',cinemaHallSchema);
export default CinemaHall;