import { prisma } from "../../config/prisma";
import type { CreateMovieInput, UpdateMovieInput } from "./movie.schema.js";

export async function createMovie(input: CreateMovieInput) {
  return prisma.movie.create({
    data: {
      title: input.title,
      description: input.description,
      duration: input.duration,
      language: input.language,
      genre: input.genre,
      releaseDate: input.releaseDate
    }
  });
}

export async function getMovies() {
  return prisma.movie.findMany({
    orderBy: {
      releaseDate: "desc"
    }
  });
}

export async function getMovieById(movieId: string) {
  return prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
}

export async function updateMovie(movieId: string, input: UpdateMovieInput) {
  return prisma.movie.update({
    where: {
      id: movieId
    },
    data: input
  });
}

export async function deleteMovie(movieId: string) {
  return prisma.movie.delete({
    where: {
      id: movieId
    }
  });
}
