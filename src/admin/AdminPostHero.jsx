import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function AdminPostHero() {
  const [formData, setFormData] = useState({
    badge: "",
    heading: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
  try {
    setLoading(true);
     console.log("Fetching hero data...",API_BASE_URL);
    const res = await axios.get(`${API_BASE_URL}/hero`);

    if (res.data) {
      setFormData(res.data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async () => {
  try {
    setSubmitting(true);

    await axios.put(`${API_BASE_URL}/hero`, formData);

    setFormData({
      badge: "",
      heading: "",
      description: "",
    });

    alert("Hero Updated");
  } catch (error) {
    console.log(error);
  } finally {
    setSubmitting(false);
  }
};

  return (
  <>
    {loading ? (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    ) : (
      <div className="flex justify-center items-center w-full min-h-[80vh]">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-black">
          <h2 className="text-2xl font-semibold mb-6">Update Hero Section</h2>

          {/* Badge */}
          <label className="block mb-1 font-medium">Section Badge</label>

          <input
            name="badge"
            value={formData.badge}
            onChange={handleChange}
            placeholder="Enter badge text"
            className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Heading */}
          <label className="block mb-1 font-medium">Main Heading</label>

          <input
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Enter main heading"
            className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Description */}
          <label className="block mb-1 font-medium">Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="4"
            className="w-full border p-3 mb-6 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Update Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="
            w-full
            text-white
            py-3
            rounded-lg
            font-semibold
            transition-all duration-300
            bg-gradient-to-r
            from-[#2E1A6D]
            via-[#3A2371]
            to-[#4B2D73]
            hover:opacity-90
            cursor-pointer
            "
          >
            {submitting ? "Updating..." : "Update Hero"}
          </button>
        </div>
      </div>
    )}
  </>
);
  // return (
  //   <div className="flex justify-center items-center w-full min-h-[80vh]">
  //     <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-black">
  //       <h2 className="text-2xl font-semibold mb-6">Update Hero Section</h2>

  //       {/* Badge */}
  //       <label className="block mb-1 font-medium">Section Badge</label>

  //       <input
  //         name="badge"
  //         value={formData.badge}
  //         onChange={handleChange}
  //         placeholder="Enter badge text"
  //         className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
  //       />

  //       {/* Heading */}
  //       <label className="block mb-1 font-medium">Main Heading</label>

  //       <input
  //         name="heading"
  //         value={formData.heading}
  //         onChange={handleChange}
  //         placeholder="Enter main heading"
  //         className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
  //       />

  //       {/* Description */}
  //       <label className="block mb-1 font-medium">Description</label>

  //       <textarea
  //         name="description"
  //         value={formData.description}
  //         onChange={handleChange}
  //         placeholder="Enter description"
  //         rows="4"
  //         className="w-full border p-3 mb-6 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
  //       />

  //       {/* Update Button */}
  //       <button
  //         onClick={handleSubmit}
  //         className="
  //       w-full
  //       text-white
  //       py-3
  //       rounded-lg
  //       font-semibold
  //       transition-all duration-300

  //       bg-gradient-to-r
  //       from-[#2E1A6D]
  //       via-[#3A2371]
  //       to-[#4B2D73]

  //       hover:opacity-90
  //       cursor-pointer
  //       "
  //       >
  //         Update Hero
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default AdminPostHero;
