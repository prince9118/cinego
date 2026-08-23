import type { Request,Response } from "express";
import { createCitySchema,updateCitySchema } from "./city.schema";
import { createCity,deleteCity,getCities,getCityById,updateCity } from "./city.service";
import { error } from "node:console";

export async function createCityController(req:Request,res:Response) {
    const result=createCitySchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success:false,
            message:"Validation Error",
            errors:result.error.flatten()
        })
    }
    
}