import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    startTime: new Date(),
    location: "",
    duration: "",
    participantsMin: "",
    participantsMax: "",
    notes: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Название"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <DatePicker
        selected={formData.startTime}
        onChange={(date) => setFormData({ ...formData, startTime: date })}
        showTimeSelect
        dateFormat="Pp"
        minDate={new Date()}
        minTime={
          formData.startTime?.toDateString() === new Date().toDateString()
            ? new Date()
            : new Date(0, 0, 0, 0, 0)
        }
        maxTime={new Date(0, 0, 0, 23, 59)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="duration"
        placeholder="Время партии (в часах)"
        value={formData.duration}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Место проведения"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-2">
        <input
          type="number"
          name="participantsMin"
          placeholder="Мин. участники"
          value={formData.participantsMin}
          onChange={handleChange}
          min="2"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="participantsMax"
          placeholder="Макс. участники"
          value={formData.participantsMax}
          onChange={handleChange}
          min={formData.participantsMin || "2"}
          max="20"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <input
        type="url"
        name="link"
        placeholder="Ссылка"
        value={formData.link}
        onChange={handleChange}
        // required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="notes"
        placeholder="Примечание (опционально)"
        value={formData.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        name="image"
        placeholder="Добавить фото"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Создать событие
      </button>
    </form>
  );
};

export default CreateEventForm;
