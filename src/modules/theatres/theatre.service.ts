import th from "zod/v4/locales/th.js";
import { prisma } from "../../config/prisma.js";
import type {
  CreateTheatreInput,
  UpdateTheatreInput
} from "./theatre.schema.js";

export async function createTheatre(input: CreateTheatreInput) {
  return prisma.theatre.create({
    data: {
      name: input.name,
      address: input.address,
      cityId: input.cityId
    }
  });
}

export async function getTheatres() {
  return prisma.theatre.findMany({
    include: {
      city: true
    },
    orderBy: {
      name: "asc"
    }
  });
}

export async function getTheatreById(theatreId: string) {
  return prisma.theatre.findUnique({
    where: {
      id: theatreId
    },
    include: {
      city: true
    }
  });
}

export async function updateTheatre(
  theatreId: string,
  input: UpdateTheatreInput
) {
  return prisma.theatre.update({
    where: {
      id: theatreId
    },
    data: input
  });
}

export async function deleteTheatre(theatreId: string) {
  return prisma.theatre.delete({
    where: {
      id: theatreId
    }
  });
}
