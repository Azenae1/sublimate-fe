import Image from "next/image";

const EventCard = ({ event = {} }) => {
  const placeholderEvent = {
    title: "Название события",
    image: "/placeholder.jpg",
    location: "Место проведения",
    startTime: "00:00",
    participants: { min: 1, max: 10 },
  };

  const data = { ...placeholderEvent, ...event };

  return (
    <div className="bg-white rounded-2xl shadow-md w-80">
      {data.image && (
        <div className="w-full h-40 relative overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{data.title}</h2>
        <p className="text-gray-600 mb-1">📍 {data.location}</p>
        <p className="text-gray-600 mb-1">🕒 {data.startTime}</p>
        <p className="text-gray-600">
          👥 {data.participantsMin} - {data.participantsMax} участников
        </p>
      </div>
    </div>
  );
};

export default EventCard;
