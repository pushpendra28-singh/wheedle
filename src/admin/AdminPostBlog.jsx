import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
function AdminPostBlog({ category, onBack }) {
  const [existingBlogs, setExistingBlogs] = useState([]);

  const [preview, setPreview] = useState("");

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

  // FETCH BLOGS

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get(`${API_BASE_URL}/blogs`);

    setExistingBlogs(res.data);
  };

  // HANDLE CHANGE

  const handleChange = (e) => {
    const { name, value } = e.target;

    // SECTION TITLES

    if (name.startsWith("sectionTitles.")) {
      const key = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,

        sectionTitles: {
          ...prev.sectionTitles,

          [key]: value,
        },
      }));
    }

    // CONTENT SIMPLE
    else if (
      name.startsWith("content.") &&
      !name.includes("benefits") &&
      !name.includes("howItWorks")
    ) {
      const key = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,

        content: {
          ...prev.content,

          [key]: value,
        },
      }));
    }

    // BENEFITS DESCRIPTION
    else if (name === "benefits.description") {
      setFormData((prev) => ({
        ...prev,

        content: {
          ...prev.content,

          benefits: {
            ...prev.content.benefits,

            description: value,
          },
        },
      }));
    }

    // BENEFITS ITEMS
    else if (name.startsWith("benefits.item")) {
      const index = name.split(".")[2];

      const field = name.split(".")[3];

      const updated = [...formData.content.benefits.items];

      updated[index][field] = value;

      setFormData((prev) => ({
        ...prev,

        content: {
          ...prev.content,

          benefits: {
            ...prev.content.benefits,

            items: updated,
          },
        },
      }));
    }

    // HOW IT WORKS
    else if (name.startsWith("howItWorks.item")) {
      const index = name.split(".")[2];

      const field = name.split(".")[3];

      const updated = [...formData.content.howItWorks];

      updated[index][field] = value;

      setFormData((prev) => ({
        ...prev,

        content: {
          ...prev.content,

          howItWorks: updated,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,

        [name]: value,
      }));
    }
  };

  // IMAGE

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,

      blogImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // ✅ ADD BENEFIT
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

  // ✅ REMOVE BENEFIT
  const removeBenefit = (index) => {
    const updated = [...formData.content.benefits.items];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        benefits: {
          ...prev.content.benefits,
          items: updated,
        },
      },
    }));
  };

  // ✅ ADD HOW IT WORKS
  const addHowItWorks = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        howItWorks: [...prev.content.howItWorks, { title: "", desc: "" }],
      },
    }));
  };

  // ✅ REMOVE HOW IT WORKS
  const removeHowItWorks = (index) => {
    const updated = [...formData.content.howItWorks];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        howItWorks: updated,
      },
    }));
  };

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // SERVICES BLOG
      if (category === "services") {
        await axios.post(`${API_BASE_URL}/blogs`, {
          category,
          title: formData.title,
          description: formData.description,
        });

        alert("Services Blog Posted");
        onBack();
        return;
      }

      // COMPREHENSIVE BLOG (unchanged)
      const data = new FormData();

      data.append("category", category);
      data.append("slug", formData.slug);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("blogCategory", formData.blogCategory);
      data.append("blogImage", formData.blogImage);
      data.append("sectionTitles", JSON.stringify(formData.sectionTitles));
      data.append("content", JSON.stringify(formData.content));

      await axios.post(`${API_BASE_URL}/blogs`, data);

      alert("Blog Posted");
      onBack();
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const data = new FormData();

  //     data.append("category", category);

  //     data.append("slug", formData.slug);

  //     data.append("title", formData.title);

  //     data.append("description", formData.description);

  //     data.append("blogImage", formData.blogImage);

  //     data.append("sectionTitles", JSON.stringify(formData.sectionTitles));

  //     data.append("content", JSON.stringify(formData.content));

  //     await axios.post("http://localhost:5000/api/blogs", data);

  //     alert("Blog Posted");

  //     onBack();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="w-full">
      <div className="bg-[#F8FAFC] border border-gray-300 p-8 rounded-xl shadow-sm">
        {/* SERVICES BLOG FORM */}
        {category === "services" ? (
          <>
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Post Services Blog
              </h2>

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
              <h2 className="text-2xl font-semibold text-gray-800">
                Post Comprehensive Blog
              </h2>

              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] cursor-pointer"
              >
                View All Blogs
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
              {/* BASIC INFO */}

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

              {/* IMAGE */}

              <div>
                <label className="font-medium">Blog Image</label>

                <input
                  type="file"
                  onChange={handleImageChange}
                  className="inputbox"
                />

                {preview && <img src={preview} className="h-32 mt-3" />}
              </div>

              {/* SECTION TITLES */}

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

              {/* CONTENT */}

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

              {/* BENEFITS */}

              <h4 className="font-semibold">Benefits Description</h4>

              <textarea
                name="benefits.description"
                placeholder="Benefits Description"
                onChange={handleChange}
                className="inputbox"
              />

              {formData.content.benefits.items.map((item, index) => (
                <div key={index} className="border p-4 rounded mb-3">
                  <input
                    name={`benefits.item.${index}.title`}
                    placeholder={`Benefit ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox"
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
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addBenefit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                + Add Benefit
              </button>
              {/* 
              {formData.content.benefits.items.map((item, index) => (
                <div key={index}>
                  <input
                    name={`benefits.item.${index}.title`}
                    placeholder={`Benefit ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox"
                  />

                  <input
                    name={`benefits.item.${index}.desc`}
                    placeholder={`Benefit ${index + 1} Description`}
                    onChange={handleChange}
                    className="inputbox"
                  />
                </div>
              ))} */}

              <textarea
                name="content.future"
                placeholder="Future Content"
                onChange={handleChange}
                className="inputbox"
              />

              <h4 className="font-semibold">How It Works</h4>

              {/* HOW IT WORKS */}

              {formData.content.howItWorks.map((item, index) => (
                <div key={index} className="border p-4 rounded mb-3">
                  <input
                    name={`howItWorks.item.${index}.title`}
                    placeholder={`Step ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox"
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
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addHowItWorks}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                + Add Step
              </button>

              {/* {formData.content.howItWorks.map((item, index) => (
                <div key={index}>
                  <input
                    name={`howItWorks.item.${index}.title`}
                    placeholder={`Step ${index + 1} Title`}
                    onChange={handleChange}
                    className="inputbox"
                  />

                  <input
                    name={`howItWorks.item.${index}.desc`}
                    placeholder={`Step ${index + 1} Description`}
                    onChange={handleChange}
                    className="inputbox"
                  />
                </div>
              ))} */}

              <textarea
                name="content.final"
                placeholder="Final Content"
                onChange={handleChange}
                className="inputbox"
              />

              <button
                type="submit"
                className="px-8 py-3 text-white bg-gradient-to-r from-[#2E1A6D] via-[#3A2371] to-[#4B2D73] rounded-lg cursor-pointer"
              >
                Post Blog
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPostBlog;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function AdminPostBlog({ category, onBack }) {
//   const [formData, setFormData] = useState({
//     image: null,
//     title: "",
//     description: "",
//   });

//   const [preview, setPreview] = useState("");

//   const [existingBlogs, setExistingBlogs] = useState([]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const fetchBlogs = async () => {
//     const res = await axios.get("http://localhost:5000/api/blogs");

//     setExistingBlogs(res.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setFormData({
//         ...formData,
//         image: file,
//       });

//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isDuplicate = existingBlogs.some(
//       (item) =>
//         item.title === formData.title &&
//         item.description === formData.description,
//     );

//     if (isDuplicate) {
//       alert("Blog already exists!");

//       return;
//     }

//     try {
//       const data = new FormData();

//       data.append("title", formData.title);

//       data.append("description", formData.description);

//       data.append("category", category);

//       if (category === "comprehensive") {
//         data.append("image", formData.image);
//       }

//       await axios.post("http://localhost:5000/api/blogs", data);

//       alert("Blog Posted Successfully");

//       setFormData({
//         title: "",
//         description: "",
//         image: null,
//       });

//       setPreview("");

//       fetchBlogs();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-[#F8FAFC] border border-gray-300 p-6 lg:p-8 rounded-xl shadow-sm">
//         {/* HEADER */}

//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
//             Post New {category === "services" ? "Services" : "Comprehensive"}{" "}
//             Blog
//           </h2>

//           <button
//             onClick={onBack}
//             className="

// px-6 py-2.5

// rounded-lg

// text-sm font-semibold

// text-white

// bg-gradient-to-r

// from-[#2E1A6D]

// via-[#3A2371]

// to-[#4B2D73]

// hover:opacity-90

// transition

// shadow-md

// "
//           >
//             View All Blogs
//           </button>
//         </div>

//         {/* FORM */}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           {/* IMAGE only Comprehensive */}

//           {category === "comprehensive" && (
//             <div>
//               <label className="font-medium text-gray-700">Upload Image</label>

//               <label
//                 className="

// mt-2

// flex

// items-center

// justify-center

// w-full

// px-6

// py-6

// border-2

// border-dashed

// border-gray-300

// rounded-lg

// cursor-pointer

// bg-white

// hover:border-[#4F46E5]

// hover:bg-[#EEF2FF]

// transition

// "
//               >
//                 <span className="text-gray-500 font-medium">
//                   Click to upload image
//                 </span>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   required
//                 />
//               </label>

//               {preview && (
//                 <img
//                   src={preview}
//                   className="mt-4 h-32 rounded-lg object-cover border"
//                 />
//               )}
//             </div>
//           )}

//           {/* TITLE */}

//           <div>
//             <label className="font-medium text-gray-700">Title</label>

//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter title"
//               className="

// text-gray-900

// mt-2 w-full

// border border-gray-300

// p-3

// rounded-lg

// bg-white

// focus:ring-2

// focus:ring-[#4F46E5]

// outline-none

// "
//               required
//             />
//           </div>

//           {/* DESCRIPTION */}

//           <div>
//             <label className="font-medium text-gray-700">Description</label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter description"
//               rows="5"
//               className="

// text-gray-900

// mt-2 w-full

// border border-gray-300

// p-3

// rounded-lg

// bg-white

// focus:ring-2

// focus:ring-[#4F46E5]

// outline-none

// "
//               required
//             />
//           </div>

//           {/* BUTTON */}

//           <button
//             type="submit"
//             className="

// w-fit

// px-8

// py-3

// rounded-lg

// text-sm font-semibold

// text-white

// bg-gradient-to-r

// from-[#2E1A6D]

// via-[#3A2371]

// to-[#4B2D73]

// hover:opacity-90

// transition

// shadow-md

// "
//           >
//             Post Blog
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminPostBlog;
