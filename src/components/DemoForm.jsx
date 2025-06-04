// components/DemoForm.jsx
"use client";

import { useState } from "react";

export default function DemoForm({ projectName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      ...formData,
      project: projectName,
    };

    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-md"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Request a Demo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="tel"
          name="mobile"
          required
          placeholder="Your Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          name="project"
          value={projectName}
          disabled
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="w-full mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        rows={4}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={`mt-4 w-full px-6 py-3 rounded-lg font-medium text-white ${
          status === "sending"
            ? "bg-green-300 cursor-wait"
            : "bg-green-500 hover:bg-green-600"
        } transition`}
      >
        {status === "sending"
          ? "Sending..."
          : status === "success"
          ? "Sent!"
          : status === "error"
          ? "Error. Try Again"
          : "Submit Request"}
      </button>
      {status === "success" && (
        <p className="mt-2 text-green-600 dark:text-green-400">
          Your request has been received!
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-red-600 dark:text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
