import { prisma } from "../../config/prisma.js";

import type { CreateScreenInput, UpdateScreenInput } from "./screen.schema.js";

export async function createScreen(input: CreateScreenInput) {
  return prisma.screen.create({
    data: {
      name: input.name,
      theatreId: input.theatreId
    }
  });
}

export async function getScreens() {
  return prisma.screen.findMany({
    include: {
      theatre: {
        include: {
          city: true
        }
      }
    },
    orderBy: {
      name: "asc"
    }
  });
}

export async function getScreenById(screenId: string) {
  return prisma.screen.findUnique({
    where: {
      id: screenId
    },
    include: {
      theatre: {
        include: {
          city: true
        }
      },
      seats: true
    }
  });
}

export async function updateScreen(screenId: string, input: UpdateScreenInput) {
  return prisma.screen.update({
    where: {
      id: screenId
    },
    data: input
  });
}

export async function deleteScreen(screenId: string) {
  return prisma.screen.delete({
    where: {
      id: screenId
    }
  });
}

