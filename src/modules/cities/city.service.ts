import { prisma } from "../../config/prisma.js";
import type { CreateCityInput, UpdateCityInput } from "./city.schema.js";

export async function createCity(input: CreateCityInput) {
  return prisma.city.create({
    data: {
      name: input.name,
      state: input.state
    }
  });
}

export async function getCities() {
  return prisma.city.findMany({
    orderBy: {
      name: "asc"
    }
  });
}

export async function getCityById(cityId: string) {
  return prisma.city.findUnique({
    where: {
      id: cityId
    }
  });
}

export async function updateCity(cityId: string, input: UpdateCityInput) {
  return prisma.city.update({
    where: {
      id: cityId
    },
    data: input
  });
}

export async function deleteCity(cityId: string) {
  return prisma.city.delete({
    where: {
      id: cityId
    }
  });
}
