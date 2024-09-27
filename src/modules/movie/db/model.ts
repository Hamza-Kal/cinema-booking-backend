import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  title: string;
  genre: string;
  duration: number;
  rating: number;
  releaseDate: string;
  imageUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const movieSchema = new Schema<IMovie>({
    title:{
        type: String,
        required:true,
        unique: true,
    },
    genre:{
        type: String,
        required:true,
    },
    duration:{
        type: Number,
        required:true,
    },
    rating:{
        type: Number,
    },
    releaseDate:{
        type: String,
    },
    imageUrl:{
        type: String,
        required:true,
    }
},
{
    timestamps:true,
});
const Movie = mongoose.model<IMovie>('Movie',movieSchema)
export default Movie