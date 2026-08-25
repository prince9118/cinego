import { prisma } from "../../config/prisma.js";
import type { seatLayoutInput } from "./seat.schema.js";

export async function createSeatLayout(
  screenId: string,
  input: seatLayoutInput
) {
  const screen = await prisma.screen.findUnique({
    where: {
      id: screenId
    }
  });
  if (!screen) {
    throw new Error("Screen not found");
  }
  const seats = input.rows.flatMap((row) =>
    Array.from({ length: row.count }, (_, index) => ({
      row: row.row,
      number: index + 1,
      type: row.type,
      screenId
    }))
  );
  return prisma.seat.createMany({
    data: seats
  });
}

export async function getScreenSeats(screenId: string) {
  return prisma.seat.findMany({
    where: {
      screenId
    },
    orderBy: [
      {
        row: "asc"
      },
      {
        number: "asc"
      }
    ]
  });
}
