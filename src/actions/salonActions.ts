import { Salon } from "../types/salon";
import axiosInstance from "./axiosInstance";

export async function getSalons() : Promise<Salon[]> {
    const response = await axiosInstance.get("/salons");
    return response.data;
}   

export async function getSalon(salonId: string) : Promise<Salon> {
    const response = await axiosInstance.get(`/salons?_id=${salonId}`);
    return response.data[0];
}