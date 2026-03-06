import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Badge from "../components/Badge";
import API_BASE_URL from "../config/api";
// import blogs from "../jsondata/blogs";
import axios from "axios";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs/${slug}`);

      setBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return <div className="text-white p-20">Loading...</div>;
  }

  // Dynamic section titles
  const titles = blog.sectionTitles || {
    whatIs: "What is this?",
    benefits: "Key Benefits",
    future: "Future Outlook",
    howItWorks: "How It Works",
    final: "Conclusion",
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Header />

      {/* HERO */}
      <section className="w-full flex justify-center bg-[#010509] mt-16 lg:mt-22">
        <div className="relative w-full max-w-[1440px] min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh] mt-[-5%]">
          <img
            src="/frame-image.png"
            alt="Frame"
            className="absolute inset-0 w-full h-full object-cover lg:object-contain"
          />
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 text-center gap-6">
            <Badge text={blog.blogCategory} margin="" />
            <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] max-w-[900px]">
              {blog.title}
            </h1>
            <p className="text-gray-300 max-w-[700px]">{blog.description}</p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section
        className="w-full -mt-24 sm:-mt-30 lg:-mt-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BG.png')" }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-20 space-y-14 text-gray-300 leading-8">
          {/* BLOG IMAGE + INTRO */}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2">
              <img
               src={`${API_BASE_URL}/uploads/${blog.blogImage}`}
                alt={blog.title}
                className="rounded-2xl w-full object-cover border border-white/10"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              {blog.content.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* WHAT IS */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {titles.whatIs}
            </h2>
            {blog.content.whatIs.map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))}
          </div>

          {/* BENEFITS */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {titles.benefits}
            </h2>

            {/* Render benefits description if available */}
            {blog.content.benefits?.description && (
              <p className="mb-4">{blog.content.benefits.description}</p>
            )}

            {/* Render benefits items */}
            <ul className="list-disc list-inside space-y-4">
              {blog.content.benefits?.items?.map((item, i) => (
                <li key={i}>
                  <strong>{item.title}:</strong> {item.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* FUTURE */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {titles.future}
            </h2>
            <p>{blog.content.future}</p>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {titles.howItWorks}
            </h2>
            <ol className="list-decimal list-inside space-y-4 mt-4">
              {blog.content.howItWorks.map((step, i) => (
                <li key={i}>
                  <strong>{step.title}:</strong> {step.desc}
                </li>
              ))}
            </ol>
          </div>

          {/* FINAL */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {titles.final}
            </h2>
            {blog.content.final.map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetails;
