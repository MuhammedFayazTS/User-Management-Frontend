import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRoomsByBookingStatus } from "@/store/server/room";
import { BookingStatus } from "@/types/booking";
import { getRelatedBookingStatuses } from "@/utils/booking";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

interface RoomCard {
  label: string
  value: number
  type: BookingStatus
}

const RoomSelection = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetRoomsByBookingStatus();
  const type = useParams()?.type as unknown as BookingStatus

  useEffect(() => {
    if (!type || !Object.values(BookingStatus).includes(type as BookingStatus)) {
      navigate("/booking");
    }
  }, [navigate, type]);

  const relatedTypes = getRelatedBookingStatuses(type);
  const combinedRooms = relatedTypes.flatMap((relatedType) => data?.rooms?.[relatedType] || []);

  return isLoading ? <LoadingCards /> : (
    <div>
      <h3 className="text-center text-xl font-semibold mb-5">Rooms List</h3>
      <Separator className="my-5" />
      <div className="flex items-center gap-5">
        {combinedRooms.length > 0 ? (
          combinedRooms.map(({ label, value }) => (
            <RoomCard key={value} label={label} value={value} type={type} />
          ))
        ) : (
          <p>No rooms available for the selected status.</p>
        )}
      </div>
    </div>
  )
}

const RoomCard = ({ label, value, type }: RoomCard) => {
  const navigate = useNavigate()
  const onClick = () => navigate(`/booking/create/${type}/${value}`)
  return (
    <Card onClick={onClick} className="w-40 aspect-[4/5] shadow-md cursor-pointer hover:border-emerald-500 duration-300 transition-all ease-in-out">
      <CardContent className="flex flex-col justify-center items-center h-full p-3">
        <h4 className="text-lg font-semibold">{label}</h4>
      </CardContent>
    </Card>
  );
};

const LoadingCards = () => {
  return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton key={index} className="w-40 aspect-[4/5]" />
  ))
}

export default RoomSelection