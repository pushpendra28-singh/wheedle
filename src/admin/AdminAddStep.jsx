import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import SuccessPopup from "../components/SuccessPopup";

const AdminAddStep = ({ setActivePage }) => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [error, setError] = useState(""); // added
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!title || !description || !image) {
      setError("Please fill all the fields");
       setTimeout(() => {
    setError("");
  }, 3000);
      return;
    }

    setError(""); // clear error

    const formData = new FormData();

    formData.append("title", title);

    formData.append("description", description);

    formData.append("image", image);

    await axios.post(
      `${API_BASE_URL}/steps`,

      formData,
    );
    setSuccessMessage("Step Added Successfully");

    setTimeout(() => {
      setSuccessMessage("");
      setActivePage("steps");
    }, 2000);
  };

  return (
    <div className="flex justify-center w-full py-10 px-4">
      <div className="bg-white p-8 shadow rounded-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Step</h1>
         {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-600 mb-4 font-medium">{error}</p>
        )}
        <SuccessPopup message={successMessage} />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-gray-800"
        >
          {/* TITLE FIELD */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Title</label>

            <input
              type="text"
              placeholder="Enter step title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg outline-none focus:border-purple-700"
            />
          </div>

          {/* DESCRIPTION FIELD */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Description</label>

            <textarea
              placeholder="Enter step description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="border border-gray-300 p-3 rounded-lg outline-none focus:border-purple-700 resize-none"
            />
          </div>

          {/* IMAGE FIELD */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">Upload Image</label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 p-3 rounded-lg file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
    mt-2
    bg-gradient-to-r
    from-[#2E1A6D]
    to-[#4B2D73]
    text-white
    p-3
    rounded-lg
    font-semibold
    hover:opacity-90
    transition
    cursor-pointer
    "
          >
            Save Step
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddStep;
