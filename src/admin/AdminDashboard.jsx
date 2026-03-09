import React, { useState, useEffect } from "react";
import LogosData from "../jsondata/LogosData";
import AdminJobForm from "./AdminJobForm";
import AdminPostTestimonial from "./AdminPostTestimonial";
import ViewAllJobs from "./ViewAllJobs";
import ViewAllTestimonials from "./ViewAllTestimonials";
import ViewAllBlogs from "./ViewAllBlogs";
import AdminPostBlog from "./AdminPostBlog";
import AdminPostHero from "./AdminPostHero";
import ViewAllPartners from "./ViewAllPartners";
import AddNewPartner from "./AddNewPartner";
import ViewAllSteps from "./ViewAllSteps";
import AdminAddStep from "./AdminAddStep";
import AdminProfilePopup from "./AdminProfilePopup";
import ViewAllContacts from "./ViewAllContacts";
import ViewAllLeads from "./ViewAllLeads";
import ViewAllFormLeads from "./ViewAllFormLeads";
import API_BASE_URL from "../config/api";

import axios from "axios";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  User,
  X,
  Mail,
  Users,
  Newspaper,
  ClipboardList,
  MessageCircle,
} from "lucide-react";
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [jobCount, setJobCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [blogCategory, setBlogCategory] = useState("");
  const [homeOpen, setHomeOpen] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [applications, setApplications] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);
  const [formLeadsCount, setFormLeadsCount] = useState(0);


  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const jobRes = await axios.get(
        `${API_BASE_URL}/jobs/count/all`,
      );

      const testimonialRes = await axios.get(
        `${API_BASE_URL}/testimonial/count/all`,
      );
      const blogRes = await axios.get(
        `${API_BASE_URL}/blogs/count/all`,
      );
      const applicationsRes = await axios.get(
        `${API_BASE_URL}/contact/count/all`,
      );

      const leadsRes = await axios.get(
        `${API_BASE_URL}/leads/count/all`,
      );
      // Form Leads Count
      const formLeadsRes = await axios.get(
        `${API_BASE_URL}/formleads/count/all`,
      );
      console.log("Counts fetched:", jobRes)
      // alert(jobRes.data.count);
      setJobCount(jobRes.data.count);

      setTestimonialCount(testimonialRes.data.count);
      setBlogCount(blogRes.data.count);
      setApplications(applicationsRes.data.count);
      setLeadsCount(leadsRes.data.count);
      setFormLeadsCount(formLeadsRes.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed lg:relative z-50 h-full w-72 bg-gradient-to-b from-[#2E1A6D] via-[#3A2371] to-[#4B2D73]
         shadow-2xl flex flex-col transition-transform duration-300
         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* LOGO */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <img
            src={LogosData.adminlogo}
            className="h-20 w-auto object-contain"
          />

          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-4 space-y-2 text-white">
          {/* Dashboard */}
          <button
            onClick={() => setActivePage("dashboard")}
            className={`
        flex items-center gap-3
        w-full
        px-5 py-3
        rounded-lg
        transition-all duration-200
        cursor-pointer

        ${activePage === "dashboard"
                ? "bg-white text-black shadow-md"
                : "hover:bg-white/10"
              }
      `}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          {/* HOME MENU */}
          <div>
            {/* Home main button */}
            <button
              onClick={() => setHomeOpen(!homeOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white/10 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* icon */}
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M3 12l9-9 9 9h-3v9h-12v-9h-3z" />
                </svg>
                Home
              </div>

              {/* arrow */}
              <span>{homeOpen ? "⌄" : "›"}</span>
            </button>

            {/* Hero submenu */}
            <div
              className={`overflow-hidden transition-all duration-300 ${homeOpen ? "max-h-40" : "max-h-0"
                }`}
            >
              <button
                onClick={() => setActivePage("hero")}
                className={`
      flex items-center gap-3
      w-full
      px-5 py-3
      rounded-lg
      transition-all duration-200
      cursor-pointer

      ${activePage === "hero"
                    ? "bg-white text-black shadow-md"
                    : "text-white hover:bg-white/10"
                  }
    `}
              >
                {/* empty icon space for alignment */}
                <span className="w-[18px]"></span>
                Hero
              </button>

              {/* ✅ PARTNERS BUTTON */}
              <button
                onClick={() => setActivePage("partners")}
                className={`flex items-center gap-3
      w-full
      px-5 py-3
      rounded-lg
      transition-all duration-200
      cursor-pointer
      ${activePage === "partners" || activePage === "addPartner"
                    ? "bg-white text-black shadow-md"
                    : "text-white hover:bg-white/10"
                  }`}
              >
                <span className="w-[18px]"></span>
                Partners
              </button>

              {/* ✅ STEPS BUTTON */}
              <button
                onClick={() => setActivePage("steps")}
                className={`flex items-center gap-3
  w-full
  px-5 py-3
  rounded-lg
  transition-all duration-200
  cursor-pointer
  ${activePage === "steps" || activePage === "addStep"
                    ? "bg-white text-black shadow-md"
                    : "text-white hover:bg-white/10"
                  }`}
              >
                <span className="w-[18px]"></span>
                Steps
              </button>
            </div>
          </div>

          {/* Current Openings */}
          <button
            onClick={() => setActivePage("jobs")}
            className={`
        flex items-center gap-3
        w-full
        px-5 py-3
        rounded-lg
        transition-all duration-200
        cursor-pointer

        ${activePage === "jobs" || activePage === "postJob"
                ? "bg-white text-black shadow-md"
                : "hover:bg-white/10"
              }
      `}
          >
            <Briefcase size={18} />
            Jobs
          </button>

          {/* Blogs */}
          <button
            onClick={() => setActivePage("blogs")}
            className={`
        flex items-center gap-3
        w-full
        px-5 py-3
        rounded-lg
        transition-all duration-200
        cursor-pointer

        ${activePage === "blogs" ||
                activePage === "selectBlogCategory" ||
                activePage === "postBlog"
                ? "bg-white text-black shadow-md"
                : "hover:bg-white/10"
              }
      `}
          >
            <FileText size={18} />
            Blogs
          </button>

          {/* Testimonials */}
          <button
            onClick={() => setActivePage("testimonials")}
            className={`
        flex items-center gap-3
        w-full
        px-5 py-3
        rounded-lg
        transition-all duration-200
        cursor-pointer

        ${activePage === "testimonials" || activePage === "postTestimonial"
                ? "bg-white text-black shadow-md"
                : "hover:bg-white/10"
              }
      `}
          >
            <MessageSquare size={18} />
            Testimonials
          </button>
        </nav>
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between shadow-md sticky top-0 z-40 backdrop-blur-sm">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-3xl"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 tracking-wide">
              Admin Dashboard
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 relative">
            {/* Admin Profile Button */}
            <div
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-[#2E1A6D] to-purple-600 text-white p-2 rounded-full shadow-sm">
                <User size={18} />
              </div>

              <p className="text-gray-700 font-semibold hidden sm:block">
                Admin
              </p>
            </div>

            {/* Dropdown */}
            {profileDropdown && (
              <div className="absolute right-0 top-14 w-44 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                {/* Profile */}
                <button
                  onClick={() => {
                    setProfileOpen(true);
                    setProfileDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-purple-50 flex items-center gap-2 text-black transition"
                >
                  <User size={16} />
                  Profile
                </button>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-500 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                
                <button
                  onClick={logout}
                  className="flex items-center gap-3 text-red-400 hover:text-red-500 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div> */}
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-white rounded-xl p-8 shadow-sm border">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Welcome Admin 👋
                </h2>

                <p className="text-gray-500">
                  Manage jobs, blogs, testimonials and website content easily
                  from this dashboard.
                </p>
              </div>
              {/* Cards */}
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 p-2 rounded-2xl">
                {/* Jobs */}
                <div
                  onClick={() => setActivePage("jobs")}
                  className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">Total Jobs</p>
                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {jobCount || 0}
                    </h2>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Briefcase className="text-blue-600" size={26} />
                  </div>
                </div>

                {/* Applications */}
                <div
                  onClick={() => setActivePage("applications")}
                  className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">Applications</p>
                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {applications || 0}
                    </h2>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <ClipboardList className="text-purple-600" size={26} />
                  </div>
                </div>

                {/* Blogs */}
                <div
                  onClick={() => setActivePage("blogs")}
                  className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">Blogs</p>
                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {blogCount || 0}
                    </h2>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Newspaper className="text-green-600" size={26} />
                  </div>
                </div>

                {/* Testimonials */}
                <div
                  onClick={() => setActivePage("testimonials")}
                  className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">Testimonials</p>
                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {testimonialCount || 0}
                    </h2>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <MessageCircle className="text-yellow-600" size={26} />
                  </div>
                </div>

                {/* Newsletter */}
                <div
                  onClick={() => setActivePage("leads")}
                  className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">Newsletter</p>
                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {leadsCount || 0}
                    </h2>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Mail className="text-pink-600" size={26} />
                  </div>
                </div>

                {/* Form Leads */}
                <div
                  onClick={() => setActivePage("formleads")}
                  className="bg-white rounded-xl p-6 shadow-sm hover:-translate-y-2 hover:scale-[1.04] transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-gray-500 text-sm">Form Leads</p>
                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {formLeadsCount || 0}
                    </h2>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Users className="text-red-600" size={26} />
                  </div>
                </div>
              </div>
              {/* <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6
  p-2 rounded-2xl"
              >
                <div
                  onClick={() => setActivePage("jobs")}
                  className="relative bg-white rounded-xl p-6
    shadow-sm
    transition-transform duration-200
    hover:-translate-y-2 hover:scale-[1.04]
    cursor-pointer"
                >
                  <p className="text-gray-500 text-sm">Total Jobs</p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {jobCount}
                  </h2>
                </div>

                <div
                  onClick={() => setActivePage("applications")}
                  className="relative bg-white rounded-xl p-6
  shadow-sm transition-transform duration-200
  hover:-translate-y-2 hover:scale-[1.04]
  cursor-pointer"
                >
                  <p className="text-gray-500 text-sm">Applications</p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {applications}
                  </h2>
                </div>

                <div
                  onClick={() => setActivePage("blogs")}
                  className="relative bg-white rounded-xl p-6
    shadow-sm
    transition-transform duration-200
    hover:-translate-y-2 hover:scale-[1.04]
    cursor-pointer"
                >
                  <p className="text-gray-500 text-sm">Blogs</p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {blogCount}
                  </h2>
                </div>

                <div
                  onClick={() => setActivePage("testimonials")}
                  className="relative bg-white rounded-xl p-6
    shadow-sm
    transition-transform duration-200
    hover:-translate-y-2 hover:scale-[1.04]
    cursor-pointer"
                >
                  <p className="text-gray-500 text-sm">Testimonials</p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {testimonialCount}
                  </h2>
                </div>

                <div
                  onClick={() => setActivePage("leads")}
                  className="relative bg-white rounded-xl p-6
  shadow-sm
  transition-transform duration-200
  hover:-translate-y-2 hover:scale-[1.04]
  cursor-pointer"
                >
                  <p className="text-gray-500 text-sm">Newslatter</p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {leadsCount}
                  </h2>
                </div>

                <div
                  onClick={() => setActivePage("formleads")}
                  className="relative bg-white rounded-xl p-6
  shadow-sm
  transition-transform duration-200
  hover:-translate-y-2 hover:scale-[1.04]
  cursor-pointer"
                >
                  <p className="text-gray-500 text-sm">Leads</p>

                  <h2 className="text-3xl font-bold mt-2 text-gray-800">
                    {formLeadsCount}
                  </h2>
                </div>
              </div> */}
            </div>
          )}

          {/* HOME PAGE */}

          {activePage === "hero" && (
            <AdminPostHero onBack={() => setActivePage("home")} />
          )}

          {activePage === "partners" && (
            <ViewAllPartners setActivePage={setActivePage} />
          )}

          {activePage === "addPartner" && (
            <AddNewPartner setActivePage={setActivePage} />
          )}

          {/* STEPS PAGE */}

          {activePage === "steps" && (
            <ViewAllSteps setActivePage={setActivePage} />
          )}

          {activePage === "addStep" && (
            <AdminAddStep setActivePage={setActivePage} />
          )}

          {/* JOB PAGE */}
          {activePage === "jobs" && (
            <ViewAllJobs onPostNew={() => setActivePage("postJob")} />
          )}

          {activePage === "postJob" && (
            <AdminJobForm onViewAllJobs={() => setActivePage("jobs")} />
          )}

          {activePage === "applications" && <ViewAllContacts />}

          {activePage === "leads" && <ViewAllLeads />}

          {activePage === "formleads" && <ViewAllFormLeads />}

          {activePage === "testimonials" && (
            <ViewAllTestimonials
              onClose={() => setActivePage("postTestimonial")}
            />
          )}

          {activePage === "postTestimonial" && (
            <AdminPostTestimonial
              onViewAllTestimonials={() => setActivePage("testimonials")}
            />
          )}

          {/* BLOG PAGE */}

          {activePage === "blogs" && (
            <ViewAllBlogs
              onPostNew={() => setActivePage("selectBlogCategory")}
            />
          )}

          {/* select blog categry */}

          {activePage === "selectBlogCategory" && (
            <div className="absolute inset-0 flex items-center justify-center z-50 animate-slideDown">
              <div
                className="w-[400px] rounded-xl shadow-2xl p-6 bg-gradient-to-b from-[#2E1A6D]
               via-[#3A2371] to-[#4B2D73] text-white animate-popup"
              >
                {/* Title */}

                <h2 className="text-xl font-semibold mb-4">
                  Select Category of Blogs
                </h2>

                {/* Dropdown */}

                <select
                  onChange={(e) => {
                    setBlogCategory(e.target.value);
                    setTimeout(() => {
                      setActivePage("postBlog");
                    }, 200);
                  }}
                  className="
        w-full
        p-3
        rounded-lg
        bg-white/10 
        border border-white/30
        text-white
        outline-none
        appearance-none
cursor-pointer
        "
                >
                  <option value="" className="bg-[#2E1A6D] text-white">
                    Select Category
                  </option>

                  <option value="services" className="bg-[#2E1A6D] text-white">
                    Services Blog
                  </option>

                  <option
                    value="comprehensive"
                    className="bg-[#2E1A6D] text-white"
                  >
                    Comprehensive Blog
                  </option>
                </select>

                {/* Cancel */}

                <button
                  onClick={() => {
                    document
                      .querySelector(".animate-popup")
                      .classList.add("animate-popupClose");

                    setTimeout(() => {
                      setActivePage("blogs");
                    }, 200);
                  }}
                  className="
        mt-4
        text-white/70
        hover:text-white
        transition
        "
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* post blog page */}
          {activePage === "postBlog" && (
            <AdminPostBlog
              category={blogCategory}
              onBack={() => setActivePage("blogs")}
            />
          )}
        </main>
      </div>

      <AdminProfilePopup
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
