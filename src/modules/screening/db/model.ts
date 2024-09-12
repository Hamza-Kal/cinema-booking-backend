import mongoose, { Document, Schema } from "mongoose";

// Define the interface for Screening
export interface IScreening extends Document {
  name: string;
  movie_id: mongoose.Schema.Types.ObjectId;         
  cinema_hall_id: mongoose.Schema.Types.ObjectId;   
  start_time: Date;                                  
  end_time: Date;                                    
  available_seats: mongoose.Schema.Types.ObjectId[];
  total_seats: number;                             
  created_at: Date;                                 
  updated_at: Date;                                 
}

const screeningSchema: Schema<IScreening> = new Schema<IScreening>(
  {
    name:{
      type: String,
      required: true,
    },
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    cinema_hall_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CinemaHall",
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    available_seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
      },
    ],
    total_seats: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now, 
    },
    updated_at: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);

// Pre-save middleware to update the updated_at field
screeningSchema.pre<IScreening>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Screening = mongoose.model<IScreening>("Screening", screeningSchema);
export default Screening;
