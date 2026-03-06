import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import Toast from "./Toast";

function AdminPostBlog({ category, onBack }) {
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    blogCategory: "",
    blogImage: null,
    sectionTitles: {
      whatIs: "",
      benefits: "",
      future: "",
      howItWorks: "",
      final: "",
    },
    content: {
      intro: "",
      whatIs: "",
      benefits: {
        description: "",
        items: [
          { title: "", desc: "" },
          { title: "", desc: "" },
          { title: "", desc: "" },
          { title: "", desc: "" },
        ],
      },
      future: "",
      howItWorks: [
        { title: "", desc: "" },
        { title: "", desc: "" },
        { title: "", desc: "" },
        { title: "", desc: "" },
        { title: "", desc: "" },
      ],
      final: "",
    },
  });

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs/`);
      // setExistingBlogs(res.data); // Removed unused state
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("sectionTitles.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        sectionTitles: { ...prev.sectionTitles, [key]: value },
      }));
    } else if (
      name.startsWith("content.") &&
      !name.includes("benefits") &&
      !name.includes("howItWorks")
    ) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        content: { ...prev.content, [key]: value },
      }));
    } else if (name === "benefits.description") {
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          benefits: { ...prev.content.benefits, description: value },
        },
      }));
    } else if (name.startsWith("benefits.item")) {
      const index = name.split(".")[2];
      const field = name.split(".")[3];
      const updated = [...formData.content.benefits.items];
      updated[index][field] = value;
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          benefits: { ...prev.content.benefits, items: updated },
        },
      }));
    } else if (name.startsWith("howItWorks.item")) {
      const index = name.split(".")[2];
      const field = name.split(".")[3];
      const updated = [...formData.content.howItWorks];
      updated[index][field] = value;
      setFormData((prev) => ({
        ...prev,
        content: { ...prev.content, howItWorks: updated },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, blogImage: file }));
    setPreview(URL.createObjectURL(file));
  };

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        benefits: {
          ...prev.content.benefits,
          items: [...prev.content.benefits.items, { title: "", desc: "" }],
        },
      },
    }));
  };

  const removeBenefit = (index) => {
    const updated = [...formData.content.benefits.items];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        benefits: { ...prev.content.benefits, items: updated },
      },
    }));
  };

  const addHowItWorks = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        howItWorks: [...prev.content.howItWorks, { title: "", desc: "" }],
      },
    }));
  };

  const removeHowItWorks = (index) => {
    const updated = [...formData.content.howItWorks];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, howItWorks: updated },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category === "services") {
        await axios.post(`${API_BASE_URL}/blogs/`, {
          category,
          title: formData.title,
          description: formData.description,
        });
        setToast({ message: "Services Blog Posted!", type: "success" });
        setTimeout(() => onBack(), 2000);
        return;
      }

      const data = new FormData();
      data.append("category", category);
      data.append("slug", formData.slug);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("blogCategory", formData.blogCategory);
      data.append("blogImage", formData.blogImage);
      data.append("sectionTitles", JSON.stringify(formData.sectionTitles));
      data.append("content", JSON.stringify(formData.content));

      await axios.post(`${API_BASE_URL}/blogs/`, data);
      setToast({ message: "Blog Posted Successfully!", type: "success" });
      setTimeout(() => onBack(), 2000);
    } catch (err) {
      setToast({ message: "Failed to post blog", type: "error" });
    }
  };

  return (
    <div className="w-full relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="bg-[#F8FAFC] border border-gray-300 p-8 rounded-xl shadow-sm">
        {category === "services" ? (
          <>
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Post Services Blog</h2>
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] cursor-pointer"
              >
                View All Blogs
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
              <input
                name="title"
                placeholder="Blog Title"
                onChange={handleChange}
                className="inputbox"
                required
              />
              <textarea
                name="description"
                placeholder="Blog Description"
                onChange={handleChange}
                className="inputbox"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] rounded-lg cursor-pointer"
              >
                Post Blog
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Post Comprehensive Blog</h2>
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] cursor-pointer"
              >
                View All Blogs
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <input
                name="slug"
                placeholder="Slug (example: what-is-agentic-ai)"
                onChange={handleChange}
                className="inputbox"
              />
              <input
                name="title"
                placeholder="Blog Title"
                onChange={handleChange}
                className="inputbox"
              />
              <textarea
                name="description"
                placeholder="Blog Description"
                onChange={handleChange}
                className="inputbox"
              />
              <input
                name="blogCategory"
                placeholder="Blog Category (example: AI, Marketing, Web)"
                onChange={handleChange}
                className="inputbox"
              />
              <div>
                <label className="font-medium">Blog Image</label>
                <input type="file" onChange={handleImageChange} className="inputbox" />
                {preview && <img src={preview} className="h-32 mt-3 rounded shadow-sm" alt="Preview" />}
              </div>
              <h3 className="text-xl font-semibold">Section Titles</h3>
              {Object.keys(formData.sectionTitles).map((key) => (
                <input
                  key={key}
                  name={`sectionTitles.${key}`}
                  placeholder={`Enter ${key} heading`}
                  onChange={handleChange}
                  className="inputbox"
                />
              ))}
              <h3 className="text-xl font-semibold">Content</h3>
              <textarea
                name="content.intro"
                placeholder="Intro Content"
                onChange={handleChange}
                className="inputbox"
              />
              <textarea
                name="content.whatIs"
                placeholder="What Is Content"
                onChange={handleChange}
                className="inputbox"
              />
              <h4 className="font-semibold">Benefits</h4>
              <textarea
                name="benefits.description"
                placeholder="Benefits Description"
                onChange={handleChange}
                className="inputbox"
              />
              {formData.content.benefits.items.map((item, index) => (
                <div key={index} className="border p-4 rounded-xl mb-3 bg-white">
                  <input
                    name={`benefits.item.${index}.title`}
                    placeholder={`Benefit ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox mb-2"
                  />
                  <input
                    name={`benefits.item.${index}.desc`}
                    placeholder={`Benefit ${index + 1} Description`}
                    onChange={handleChange}
                    className="inputbox"
                  />
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove Benefit
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add Benefit
              </button>
              <textarea
                name="content.future"
                placeholder="Future Content"
                onChange={handleChange}
                className="inputbox"
              />
              <h4 className="font-semibold">How It Works</h4>
              {formData.content.howItWorks.map((item, index) => (
                <div key={index} className="border p-4 rounded-xl mb-3 bg-white">
                  <input
                    name={`howItWorks.item.${index}.title`}
                    placeholder={`Step ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox mb-2"
                  />
                  <input
                    name={`howItWorks.item.${index}.desc`}
                    placeholder={`Step ${index + 1} Description`}
                    onChange={handleChange}
                    className="inputbox"
                  />
                  <button
                    type="button"
                    onClick={() => removeHowItWorks(index)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove Step
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addHowItWorks}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                + Add Step
              </button>
              <textarea
                name="content.final"
                placeholder="Final Content"
                onChange={handleChange}
                className="inputbox"
              />
              <button
                type="submit"
                className="w-full py-4 text-white font-bold text-lg bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] rounded-xl cursor-pointer hover:opacity-95 transition shadow-lg"
              >
                Post Comprehensive Blog
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPostBlog;
