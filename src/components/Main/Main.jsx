"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventGrid from "../EventGrid/EventGrid";
import CreateEventForm from "../CreateEventForm/CreateEventForm";

const Main = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleSubmit = (formData) => {
    console.log("Event created:", formData);
    handleCloseForm();
  };

  return (
    <main className="relative flex justify-center p-4">
      <button
        onClick={handleOpenForm}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded"
      >
        + Создать событие
      </button>
      <EventGrid />
      {isFormOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <CreateEventForm onSubmit={handleSubmit} />
            <button
              onClick={handleCloseForm}
              className="mt-4 p-2 bg-red-500 text-white rounded"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
