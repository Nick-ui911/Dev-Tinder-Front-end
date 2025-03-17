import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Contact Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-lg text-gray-600 mt-2">
          Got a question? We'd love to hear from you!
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-900 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
        <p className="text-gray-700">📍 Satna, India</p>
        <p className="text-gray-700">📧 nbaghel392@gmail.com</p>
        <p className="text-gray-700">📞 +91 6232716505</p>
      </div>
    </div>
  );
};

export default Contact;
