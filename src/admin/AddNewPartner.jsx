import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import SuccessPopup from "../components/SuccessPopup";
const AddNewPartner = ({ setActivePage }) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(""); // added
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // VALIDATION (ADDED)
    if (!name || !logo) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setError(""); // clear error

    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo);

    await axios.post(`${API_BASE_URL}/partner`, formData);

    setSuccessMessage("Partner Added Successfully");

    setTimeout(() => {
      setSuccessMessage("");
      setActivePage("partners");
    }, 2000);

    
  };

  return (
    // MAIN RIGHT SECTION CONTAINER
    <div className="w-full flex justify-center items-start px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {/* FORM CARD */}
      <div className="bg-white border border-gray-300 p-6 sm:p-8 rounded-xl shadow-sm w-full max-w-lg">
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">
          Add New Partner
        </h1>
        {/* ERROR MESSAGE */}
        {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* NAME */}
          <label className="text-black font-semibold">Partner Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-gray-300 p-3 rounded-lg text-black outline-none focus:border-purple-600"
          />

          {/* LOGO */}
          <label className="text-black font-semibold">Upload Logo</label>

          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            className="w-full bg-white border border-gray-300 p-3 rounded-lg text-black"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              mt-2
              px-6
              py-3
              rounded-lg
              text-white
              font-semibold
              bg-gradient-to-r
              from-[#2E1A6D]
              to-[#4B2D73]
              hover:opacity-90
              transition
              cursor-pointer
            "
          >
            Save Partner
          </button>

        </form>
        <SuccessPopup message={successMessage} />
      </div>
    </div>
  );
};

export default AddNewPartner;
