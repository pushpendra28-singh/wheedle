import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";


function AdminPostTestimonial({ onViewAllTestimonials }) {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    position: "",
    description: "",
    date: "",
  });

  const [preview, setPreview] = useState("");
  // const [showTestimonials, setShowTestimonials] = useState(false);
  const [existingTestimonials, setExistingTestimonials] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchTestimonials = async () => {
    const res = await axios.get(`${API_BASE_URL}/testimonial`);
    setExistingTestimonials(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTestimonials();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ CHECK DUPLICATE
    const isDuplicate = existingTestimonials.some(
      (item) =>
        item.name === formData.name &&
        item.description === formData.description &&
        item.position === formData.position,
    );

    if (isDuplicate) {
      alert("Testimonial already exists!");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("position", formData.position);
      data.append("image", formData.image);
      data.append("date", formData.date);

      await axios.post(`${API_BASE_URL}/testimonial`, data);

      alert("Testimonial Added Successfully");

      // ✅ CLEAR FORM
      setFormData({
        name: "",
        description: "",
        position: "",
        date: "",
        image: null,
      });

      // clear file preview if exists
      setPreview("");

      // refresh testimonial list
      fetchTestimonials();
    } catch (error) {
      console.error(error);
    }
  };

  //   const handleSubmit = async (e) => {

  //     e.preventDefault();

  //     const data = new FormData();

  //     data.append("image", formData.image);
  //     data.append("name", formData.name);
  //     data.append("position", formData.position);
  //     data.append("description", formData.description);

  //     await axios.post("http://localhost:5000/api/testimonials", data);

  //     alert("Testimonial Posted");

  //   };

  return (
    <div className="w-full">
      <div className="bg-[#F8FAFC] border border-gray-300 p-6 lg:p-8 rounded-xl shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
            Post New Testimonial
          </h2>

          <button
            onClick={onViewAllTestimonials}
            className="
    px-6 py-2.5
    rounded-lg
    text-sm font-semibold
    text-white

    bg-gradient-to-r
    from-[#2E1A6D]
    via-[#3A2371]
    to-[#4B2D73]

    hover:opacity-90
    transition
    shadow-md
    cursor-pointer
    "
          >
            View All Testimonials
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
                required
              />
            </label>

            {preview && (
              <img
                src={preview}
                className="mt-4 h-32 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Name */}

          <div>
            <label className="font-medium text-gray-700">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
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

          {/* Position */}

          <div>
            <label className="font-medium text-gray-700">Position</label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter position"
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

          {/* Date */}

          <div>
            <label className="font-medium text-gray-700">Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
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
              placeholder="Enter description"
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

          {/* Button */}

          <button
            type="submit"
            className="
            w-fit
            px-8
            py-3
            rounded-lg
             text-sm font-semibold
    text-white

    bg-gradient-to-r
    from-[#2E1A6D]
    via-[#3A2371]
    to-[#4B2D73]

    hover:opacity-90
    transition
    shadow-md
    cursor-pointer
            "
          >
            Post Testimonial
          </button>
        </form>
      </div>

      {/* {showTestimonials && (
        <ViewAllTestimonials onClose={() => setShowTestimonials(false)} />
      )} */}
    </div>
  );
}

export default AdminPostTestimonial;
