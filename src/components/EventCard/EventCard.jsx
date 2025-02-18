import Image from "next/image";

const EventCard = ({ event = {} }) => {
  const placeholderEvent = {
    title: "Название события",
    link: "#", // Default link if not provided
    image: "/placeholder.jpg",
    location: "Место проведения",
    startTime: "00:00",
    participantsMin: 1,
    participantsMax: 10,
    notes: "", // Optional notes
  };

  const data = { ...placeholderEvent, ...event };
  const formattedStartTime =
    data.startTime instanceof Date
      ? data.startTime.toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "Invalid Date";
  const getHourWord = (duration) => {
    const num = parseInt(duration.toString().split("-").pop(), 10); // Берём последнее число
    if (num === 1) return "час";
    if (num >= 2 && num <= 4) return "часа";
    return "часов";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md w-80">
      {data.image && data.image !== "" ? (
        <div className="w-full h-40 relative overflow-hidden">
          <Image
            src={data.image || "/placeholder.jpg"}
            alt={data.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
      ) : null}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{data.title}</h2>
        <p className="text-gray-600 mb-1">📍 {data.location}</p>
        <p className="text-gray-600 mb-1">📅 {formattedStartTime}</p>
        <p className="text-gray-600 mb-1">
          ⏳ {data.duration} {getHourWord(data.duration)}
        </p>
        <p className="text-gray-600">
          👥{" "}
          {data.participantsMin === data.participantsMax
            ? data.participantsMin
            : `${data.participantsMin} - ${data.participantsMax}`}{" "}
          участников
        </p>
        {data.notes && <p className="text-gray-600 mt-2">📝 {data.notes}</p>}
        <div className="flex justify-between items-center mt-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Записаться
          </button>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Про игру
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
