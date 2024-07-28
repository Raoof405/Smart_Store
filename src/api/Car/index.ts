import { axiosIns } from "@/app/config/axios/axios";
import { AddCarDTO, GetAllCar } from "../Car/dto";
import { serialize } from "object-to-formdata";

export enum Products_API {
  base = "dashboard/category/show/1",
}

export class CarApi {
  static fetchCars = async () => {
    try {
      const { data } = await axiosIns.get<GetAllCar[]>(Products_API.base);
      return data;
    } catch (er) {
      throw er;
    }
  };

  static addCar = async (payload: Omit<AddCarDTO, "imageUrl">) => {
    try {
      const { data } = await axiosIns.post(
        Products_API.base,
        serialize(payload)
      );
      return data;
    } catch (er) {
      throw er;
    }
  };

  static deleteCar = async (carId: string | number) => {
    try {
      const res = await axiosIns.delete(`${Products_API.base}/${carId}`);
      return res;
    } catch (er) {
      throw er;
    }
  };
}
