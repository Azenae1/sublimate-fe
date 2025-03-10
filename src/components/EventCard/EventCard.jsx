import Image from "next/image";
import React, { useState } from "react";

import SignupEventForm from "../SignupEventForm/SignupEventForm";

const EventCard = ({ event = {} }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({});
  const [participants, setParticipants] = useState([]);

  const handleHover = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);
  const handleSubmit = (data) => {
    const existingParticipant = participants.find(
      (participant) => participant.telegram === data.telegram
    );
    if (existingParticipant) {
      alert("Этот ник уже зарегистрирован!");
      return;
    }

    setParticipants([...participants, data]);
    console.log("Form submitted:", data);
    setFormData(data);
    handleCloseForm();
  };

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
    const num = parseInt(duration.toString().split("-").pop(), 10);
    if (num === 1) return "час";
    if (num >= 2 && num <= 4) return "часа";
    return "часов";
  };

  const getPlaceWord = (participantsMax) => {
    if (participantsMax >= 2 && participantsMax <= 4) return "места";
    return "мест";
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
        <p className="text-gray-600 mb-1">📅 {formattedStartTime}</p>
        <p className="text-gray-600 mb-1">📍 {data.location}</p>
        <p className="text-gray-600 mb-1">
          ⏳ {data.duration} {getHourWord(data.duration)}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            👥{" "}
            {data.participantsMin === data.participantsMax
              ? data.participantsMin
              : `${data.participantsMin} - ${data.participantsMax}`}{" "}
            {getPlaceWord(data.participantsMax)}
          </p>
          <span
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer"
          >
            {participants.length} участников
            {showTooltip && (
              <div className="absolute left-0 mt-2 p-2 bg-gray-700 text-white rounded shadow-lg w-48 z-10">
                <ul className="list-none">
                  {participants.map((p, index) => (
                    <li key={index}>
                      {p.name}@{p.telegram}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </span>
        </div>
        {data.notes && <p className="text-gray-600 mt-2">📝 {data.notes}</p>}
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handleOpenForm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Записаться
          </button>
          {isFormOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
              <div className="bg-white p-6 rounded shadow-lg relative w-[480px]">
                <button
                  onClick={handleCloseForm}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Запись на {data.title}
                </h2>
                <SignupEventForm onSubmit={handleSubmit} />
              </div>
            </div>
          )}
          <a
            href={data.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-500 ${
              !data.link ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Про игру
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
