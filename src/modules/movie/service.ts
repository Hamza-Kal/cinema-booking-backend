import Movie from "./db/model";
import { ICreateMovie } from "./dto";
import { MovieErrors } from "./error-services";
import mongoose from "mongoose";

class MovieService {
  private movieErrors: MovieErrors;

  constructor() {
    this.movieErrors = new MovieErrors();
  }

  private async findByName(name: string, throwError?: boolean) {
    const movie = await Movie.findOne({ name });
    if (!movie && throwError) {
      throw this.movieErrors.notFound();
    }
    return movie;
  }

  async create({
    dto,
    imageUrl,
    session,
  }: {
    dto: ICreateMovie;
    imageUrl?: string; 
    session?: mongoose.mongo.ClientSession;
  }) {
    const existingMovie = await this.findByName(dto.title);
    if (existingMovie) {
      throw this.movieErrors.alreadyExists();
    }

    const movie = new Movie({
      ...dto,
      imageUrl, 
    });

    return await movie.save();
  }

  async getAll() {
    const movies = await Movie.find({});
    if (!movies || movies.length === 0) {
      throw this.movieErrors.notFound();
    }
    return movies;
  }
}

export default MovieService;
