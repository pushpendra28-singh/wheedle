import React, { useState } from "react";
import API_BASE_URL from "../config/api";
import SuccessPopup from "../components/SuccessPopup";

const AdminJobForm = ({ onViewAllJobs }) => {
  const [formData, setFormData] = useState({
    image: "",
    jobType: "",
    title: "",
    description: "",
  });

  // const [showJobs, setShowJobs] = useState(false);

  const [preview, setPreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setPreview(imageUrl);

      setFormData({
        ...formData,
        image: imageUrl, // stored as URL (as you requested)
      });
    }
  };

  // handle text change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileInput = document.querySelector('input[type="file"]');

      if (!fileInput.files[0]) {
        alert("Select image");

        return;
      }

      const form = new FormData();

      form.append("image", fileInput.files[0]);

      form.append("jobType", formData.jobType);

      form.append("title", formData.title);

      form.append("description", formData.description);

      const res = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",

        body: form,
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setSuccessMessage("Job Posted Successfully");

        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);

        setFormData({
          image: "",

          jobType: "",

          title: "",

          description: "",
        });

        setPreview("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-300 p-6 lg:p-8 rounded-xl shadow-sm">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
            Post New Job
          </h2>
            <SuccessPopup message={successMessage} />

          <button
            onClick={() => onViewAllJobs()}
            className="
         px-6 py-2.5

rounded-lg

text-white

font-semibold

bg-gradient-to-r

from-[#2E1A6D]

to-[#4B2D73]
cursor-pointer
          "
          >
            View All Jobs
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Image Upload */}
          <div>
            <label className="font-medium text-gray-700">Upload Image</label>

            <label
              className="
    mt-2
    flex
    items-center
    justify-center
    w-full
    px-6
    py-6
    border-2
    border-dashed
    border-gray-300
    rounded-lg
    cursor-pointer
    bg-white
    hover:border-[#4F46E5]
    hover:bg-[#EEF2FF]
    transition
    "
            >
              <span className="text-gray-500 font-medium">
                Click to upload image
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
               
              />
            </label>

            {preview && (
              <img
                src={preview}
                className="mt-4 h-32 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="font-medium text-gray-700">Job Type</label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="
  mt-2 w-full
  border border-gray-300
  p-3
  rounded-lg
  bg-white
  text-gray-800
  focus:ring-2
  focus:ring-[#4F46E5]
  focus:border-[#4F46E5]
  outline-none
  "
              required
            >
              <option value="" className="text-gray-400">
                Select Type
              </option>

              <option value="Onsite" className="text-gray-800">
                Onsite
              </option>

              <option value="Remote" className="text-gray-800">
                Remote
              </option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="font-medium text-gray-700">Job Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className="
              text-gray-900
            mt-2 w-full
            border border-gray-300
            p-3
            rounded-lg
            bg-white
            focus:ring-2
            focus:ring-[#4F46E5]
            outline-none
            "
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-gray-700">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="5"
              className="
              text-gray-900
            mt-2 w-full
            border border-gray-300
            p-3
            rounded-lg
            bg-white
            focus:ring-2
            focus:ring-[#4F46E5]
            outline-none
            "
              required
            />
          </div>

          {/* Post Button */}
          <button
            type="submit"
            className="
          px-6 py-2.5

rounded-lg

text-white

font-semibold

bg-gradient-to-r

from-[#2E1A6D]

to-[#4B2D73]
cursor-pointer
          "
          >
            Post Job
          </button>
        </form>
      </div>

      {/* {showJobs && <ViewAllJobs onClose={() => setShowJobs(false)} />} */}
    </div>
  );
};

export default AdminJobForm;
