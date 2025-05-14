import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";

export interface RoomType {
  id: number;
  name: string;
  branchId: number;
  description?: string;
  price: number;
}

export interface NewRoomType {
  name: string;
  branchId: number;
  description?: string;
  price: number;
}

export interface GetRoomType {
  getRoomType: RoomType;
}

export interface GetRoomTypesResponse extends BaseGetAllApiResponse {
  roomTypes: {
    count: number;
    rows: RoomType[] | [];
  };
}

export interface GetRoomTypeResponse extends BaseApiResponse {
  roomType: RoomType;
}

export interface GetRoomTypesForSelectResponse extends BaseApiResponse {
  roomTypes: SelectOption[];
}
