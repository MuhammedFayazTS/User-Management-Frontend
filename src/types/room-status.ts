import { SelectOption } from "@/components/core/DefaultSelect";
import { BaseApiResponse, BaseGetAllApiResponse } from "./common";

export interface RoomStatus {
  id: number;
  name: string;
  description?: string;
}

export interface NewRoomStatus {
  name: string;
  description?: string;
}

export interface GetRoomStatus {
  getRoomStatus: RoomStatus;
}

export interface GetRoomStatusesResponse extends BaseGetAllApiResponse {
  roomStatuses: {
    count: number;
    rows: RoomStatus[] | [];
  };
}

export interface GetRoomStatusResponse extends BaseApiResponse {
  roomStatus: RoomStatus;
}

export interface GetRoomStatusesForSelectResponse extends BaseApiResponse {
  roomStatuses: SelectOption[];
}
