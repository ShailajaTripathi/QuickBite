import { useState } from "react";

const Contact = () => {
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [errors, setErrors] = useState({ name: "", email: "", message: "" });


const validate = (name, value) => {
  switch (name) {
    case "name":
      return value.length < 3 ? "Name must be at least 3 characters." : "";
    case "email":
      return value.length < 5 || !value.includes("@") ? "Invalid email address." : "";
    case "message":
      return value.length < 10 ? "Message must be at least 10 characters." : "";
    default:
      return "";
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;

  // Update form values
  setFormData({ ...formData, [name]: value });

  // Update errors in real-time
  const errorMessage = validate(name, value);
  setErrors({ ...errors, [name]: errorMessage });
};
const handleSubmit = (e) => {
  e.preventDefault();

  // Validate all fields
  const nameError = validate("name", formData.name);
  const emailError = validate("email", formData.email);
  const messageError = validate("message", formData.message);

  if (nameError || emailError || messageError) {
    setErrors({ name: nameError, email: emailError, message: messageError });
    return; // Stop submission
  }

  // If we reach here, form is valid
  alert("Form submitted successfully!");
  setFormData({ name: "", email: "", message: "" });
  setErrors({}); // Clear any residual errors
};

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message} </p>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
