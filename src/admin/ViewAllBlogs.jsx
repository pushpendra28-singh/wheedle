import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const ViewAllBlogs = ({ onPostNew }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading;
    const res = await fetch(`${API_BASE_URL}/blogs`);

    const data = await res.json();

    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-sm w-full">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">All Blogs</h2>

        <button
          onClick={onPostNew}
          className="px-6 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73] cursor-pointer"
        >
          Post New Blog
        </button>
      </div>

      {/* COMPREHENSIVE BLOGS */}

      <h3 className="text-xl font-semibold mb-3 text-black">
        Comprehensive Blogs
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
        <div className="overflow-x-auto mb-10">
          <table className="w-full">
            <thead className="bg-gray-100 text-lg text-black">
              <tr>
                <th className="p-4">Image</th>

                <th className="p-4">Title</th>

                <th className="p-4">Description</th>

                <th className="p-4">Date</th>

                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs

                .filter((blog) => blog.category === "comprehensive")

                .map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b hover:bg-gray-100 transition text-black"
                  >
                    <td className="p-4">
                      <img
                        src={`${API_BASE_URL}/uploads/${blog.blogImage}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="p-4">{blog.title}</td>

                    <td className="p-4">{blog.description}</td>

                    <td className="p-4">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-500 text-2xl hover:scale-110 transition"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SERVICES BLOGS */}

      <h3 className="text-xl font-semibold mb-3 text-black">Services Blogs</h3>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-lg text-black">
            <tr>
              <th className="p-4">Title</th>

              <th className="p-4">Description</th>

              <th className="p-4">Date</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs

              .filter((blog) => blog.category === "services")

              .map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b hover:bg-gray-100 transition text-black"
                >
                  <td className="p-4">{blog.title}</td>

                  <td className="p-4">{blog.description}</td>

                  <td className="p-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 text-2xl hover:scale-110 transition"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default ViewAllBlogs;
