import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

function BlogLatest() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blogs`)

      .then((res) => {
        const sortedBlogs = res.data
          .filter((b) => b.category === "services")
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setBlogs(sortedBlogs);
      });
  }, []);

  
  
  // const blogsRow1 = [
  //   {
  //     title: "Strategy & Consulting",
  //     description: "We analyze your business goals and challenges to create a clear digital roadmap. Our strategic approach ensures scalable, secure, and result-oriented technology solutions.",
  //     wide: true,

  //   },
  //   {
  //     title: "UI/UX Design",
  //     description: "User-centered design solutions that enhance usability, boost engagement, and deliver seamless digital experiences across all devices.",
  //   },
  // ];

  // const blogsRow2 = [
  //   {
  //     title: "Mobile App Development",
  //     description: "Custom iOS and Android applications built for performance, scalability, and smooth user experiences—tailored to meet modern business needs.",
  //   },
  //   {
  //     title: "QA & Testing",
  //     description: "Comprehensive testing services to ensure your applications are secure, bug-free, and perform flawlessly across all platforms.",
  //   },
  //   {
  //     title: "Digital Transformation",
  //     description: "Helping businesses modernize their processes through innovative technologies, automation, and data-driven solutions.",
  //   },
  //   {
  //     title: "Technology & Innovation",
  //     description: "Insights into emerging technologies, industry trends, and smart solutions that drive digital growth and competitive advantage.",
  //   },
  // ];

  // const blogsRow3 = [
  //   {
  //     title: "Mobile App Development",
  //     description: "Custom iOS and Android applications designed for performance, usability, and scalability to deliver seamless mobile experiences.",
  //   },
  //   {
  //     title: "QA & Testing",
  //     description: "Comprehensive testing services to ensure your applications are secure, bug-free, and perform flawlessly across all platforms.",
  //   },
  //   {
  //     title: "Digital Transformation",
  //     description: "Helping businesses modernize their processes through innovative technologies, automation, and data-driven solutions.",
  //   },
  // ];

  // divide blogs serial wise

  
  return (
    <section className="w-full py-20">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-Gotham text-white mb-4">
              Our Latest{" "}
              <span className="font-Gotham text-white/70">Blogs</span>
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-2xl mx-auto">
              We help businesses grow smarter and faster through
              technology-driven solutions.
              <br />
              By blending innovation with expertise, we transform ideas into
              scalable, high-performance digital products.
            </p>
          </div>

          <div className="space-y-4">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {blogs.slice(0, 2).map((blog) => (
                <div
                  key={blog._id}
                  className="
        lg:col-span-2
        p-6
        rounded-2xl
        bg-[#040010]
        border border-[#7B92FF]
        transition-all duration-300 ease-out
        hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
        hover:-translate-y-3 hover:scale-[1.02]
        hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]
        "
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-white leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>

            {/* ROW 2 */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {blogs.slice(2, 6).map((blog) => (
                <div
                  key={blog._id}
                  className="
        p-6
        rounded-2xl
        bg-[#040010]
        border border-[#7B92FF]
        transition-all duration-300 ease-out
        hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
        hover:-translate-y-3 hover:scale-[1.02]
        hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]
        "
                >
                  <h3 className="text-base font-semibold text-white mb-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-white leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>

            {/* ROW 3 */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.slice(6, 9).map((blog) => (
                <div
                  key={blog._id}
                  className="
        p-6
        rounded-2xl
        bg-[#040010]
        border border-[#7B92FF]
        transition-all duration-300 ease-out
        hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
        hover:-translate-y-3 hover:scale-[1.02]
        hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]
        "
                >
                  <h3 className="text-base font-semibold text-white mb-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-white leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 1 - 2 Cards (1 wide, 1 normal) */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {row1.map((blog, index) => (
              <div
                key={index}
                className=" p-6 rounded-2xl bg-[#040010] border border-[#7B92FF] transition-all duration-300 ease-out     hover:bg-gradient-to-br hover:from-[#2934E4] hover:to-[#171D7E]
                 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-white leading-relaxed">
                  {blog.description}
                </p>
              </div>
            ))}
          </div> */}

          {/* Row 2 - 4 Cards */}
          {/* <div className="group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {row2.map((blog, index) => (
              <div
                key={index}
                className=" p-6 rounded-2xl bg-[#040010] border border-[#7B92FF] transition-all duration-300 ease-out
               hover:bg-[#2934E4] hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-white leading-relaxed">
                  {blog.description}
                </p>
              </div>
            ))}
          </div> */}

          {/* Row 3 - 3 Cards */}
          {/* <div className="group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {row3.map((blog, index) => (
              <div
                key={index}
                className=" p-6 rounded-2xl bg-[#040010] border border-[#7B92FF] transition-all duration-300 ease-out
              hover:bg-[#2934E4] hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(123,146,255,0.45)]"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-white leading-relaxed">
                  {blog.description}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default BlogLatest;
