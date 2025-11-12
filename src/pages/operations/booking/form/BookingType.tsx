import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import booking from "@/assets/icons/booking/booking.png"
import checkIn from "@/assets/icons/booking/check-in-desk.png"
import checkOut from "@/assets/icons/booking/check-out.png"
import cancel from "@/assets/icons/booking/cancelled.png"

interface BookingTypeCard {
  name: string
  image: string
  toPath: string
}

const BookingType = () => {
  const bookingTypes = [
    {
      name: "Book",
      image: booking,
      toPath: "/booking/create/booked"
    },
    {
      name: "Check IN",
      image: checkIn,
      toPath: "/booking/create/checked-in"
    },
    {
      name: "Check Out",
      image: checkOut,
      toPath: "/booking/create/checked-out"
    },
    {
      name: "Cancel",
      image: cancel,
      toPath: "/booking/create/cancelled"
    },
  ]
  return (
    <div className="flex items-center gap-5">
      {
        bookingTypes.map(({ name, image, toPath }) => (
          <BookingTypeCard
            key={name}
            name={name}
            image={image}
            toPath={toPath}
          />
        ))
      }
    </div>
  );
};

const BookingTypeCard = ({ name, image, toPath }: BookingTypeCard) => {
  const navigate = useNavigate()
  const onClick = () => navigate(toPath)
  return (
    <Card onClick={onClick} className="w-36 aspect-[4/5] shadow-md cursor-pointer hover:border-sky-500 duration-300 transition-all ease-in-out">
      <CardContent className="flex flex-col justify-center items-center h-full p-3">
        <img
          src={image}
          alt={name + " image"}
          loading="lazy"
          className="w-full aspect-square object-cover p-4"
        />
        <h4 className="text-lg font-semibold">{name}</h4>
      </CardContent>
    </Card>
  );
};

export default BookingType;
