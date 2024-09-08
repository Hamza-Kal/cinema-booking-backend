import { pick } from "lodash";
import { IMovie } from "../db/model";

export interface IMovieEntity {
  _id: string;
  title: string;
  duration: number;
  genre: string;
  rating: number;
  releaseDate: string;
}

export class MovieEntity {
  private _id: string;
  private title: string;
  private duration: number;
  private rating: number;
  private releaseDate: string;
  private genre: string;
  constructor(movie: IMovie) {
    Object.assign(
      this,
      pick(movie, [
        "_id",
        "title",
        "duration",
        "rating",
        "releaseDate",
        "genre",
      ])
    );
  }
  serialize(): IMovieEntity {
    return {
      _id: this._id,
      title: this.title,
      duration: this.duration,
      rating: this.rating,
      releaseDate: this.releaseDate,
      genre: this.genre,
    };
  }
}
