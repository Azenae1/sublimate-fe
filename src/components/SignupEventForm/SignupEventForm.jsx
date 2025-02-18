import { useState } from "react";

const SignupEventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", telegram: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="telegram"
        placeholder="Ник в Telegram"
        value={formData.telegram}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Подтвердить
      </button>
    </form>
  );
};

export default SignupEventForm;
