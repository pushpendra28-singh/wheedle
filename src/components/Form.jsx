import React, { useState, forwardRef } from "react";
import API_BASE_URL from "../config/api";

const Form = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    lookingFor: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    // Phone validation (only if entered)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      setMessage("Phone number must be 10 digits");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✔ Saved Successfully. We will contact you soon.");

        setFormData({
          name: "",
          email: "",
          phone: "",
          lookingFor: "",
        });
      } else {
        setMessage("Something went wrong");
      }
    } catch (error) {
      setMessage("Server error. Try again");
    }

    setLoading(false);
  };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(formData.email)) {
  //       setMessage("Please enter a valid email address.");
  //       return;
  //     }

  //     if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
  //       setMessage("Please enter a valid 10-digit phone number.");
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       setMessage("");

  //       await emailjs.send(
  //         "service_0rfgenl",
  //         "template_1t0tf7e",
  //         {
  //           message: `
  // Name: ${formData.name}
  // Email: ${formData.email}
  // Phone: ${formData.phone}
  // Looking For: ${formData.lookingFor}
  //           `,
  //         },
  //         "uAT0iHgXv_Fm3WosM"
  //       );

  //       setMessage("We’ll get in touch with you soon!");

  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         lookingFor: "",
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       setMessage("Failed to send. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[100px] pt-28 pb-16">
        <h2 className="font-gotham font-normal text-white text-[36px] sm:text-[44px] lg:text-[53px] leading-[48px] lg:leading-[63px] text-center">
          Ready to Join Us?
        </h2>

        <p className="font-inter font-medium text-white text-[16px] leading-[26px] text-center mt-4 max-w-[720px] mx-auto">
          Ready to grow your career with a team that values your potential? Join
          us.
        </p>

        <div className="mt-14 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[570px] bg-black rounded-[50px] p-10 flex flex-col gap-[30px] shadow-[0_0_80px_rgba(11,44,195,0.55)]"
          >
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phone: value });
                }}
                maxLength={10}
                placeholder="Enter your phone number"
                className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Looking For?</label>
              <input
                name="lookingFor"
                value={formData.lookingFor}
                onChange={handleChange}
                placeholder="Enter your requirement"
                className="w-full h-[50px] bg-white/10 rounded-[10px] px-5 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#0B2CC3]"
              />
            </div>

            {message && (
              <p
                className={`text-center text-sm ${message.includes("Successfully")
                  ? "text-green-400"
                  : "text-red-400"
                  }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full h-[62px] rounded-[10px] text-white font-medium border border-[#355BFF] transition
                bg-[#0B2CC3] hover:bg-[#102FE0]
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "Sending..." : "Get a Call"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Form;
