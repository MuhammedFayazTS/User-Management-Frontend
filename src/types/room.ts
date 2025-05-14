import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";
import { RoomStatus } from "./room-status";
import { Branch } from "./branch";
import { RoomType } from "./room-type";

export interface Room {
  id: number;
  number: string;
  typeId: number;
  statusId: number;
  branchId: number;
  status?:RoomStatus,
  Branch?:Branch,
  type?:RoomType,
}

export interface NewRoom {
  number: string;
  typeId: number;
  statusId: number;
  branchId: number;
}

export interface GetRoom {
  getRoom: Room;
}

export interface GetRoomsResponse extends BaseGetAllApiResponse {
  rooms: {
    count: number;
    rows: Room[] | [];
  };
}

export interface GetRoomResponse extends BaseApiResponse {
  room: Room;
}

export interface GetRoomsForSelectResponse extends BaseApiResponse {
  rooms: SelectOption[];
}
