import { prisma } from "../../config/prisma.js";
import type {
    CreateCityInput,UpdateCityInput
} from "./city.schema.js";

export async function createCity(input:CreateCityInput){
    return prisma.city.create
}
