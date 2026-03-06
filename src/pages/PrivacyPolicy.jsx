import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Badge from "../components/Badge";

/* ---------- COMPONENTS ---------- */

const PolicyCard = ({ title, text, list }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>

    {text && <p className="text-gray-300">{text}</p>}

    {list && (
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

/* ---------- PAGE ---------- */

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Header />

      {/* HERO */}
      <section className="w-full flex justify-center bg-[#010509] mt-16 lg:mt-22">
        <div className="relative w-full max-w-[1440px] min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh]">
          <img
            src="/frame-image.png"
            alt="Frame"
            className="absolute inset-0 w-full h-full object-cover lg:object-contain"
          />

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 text-center gap-6">
            <Badge text="Legal" margin="" />

            <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px]">
              Privacy Policy & Terms
            </h1>

            <p className="text-gray-300 max-w-[700px]">
              Learn how we collect, use, and protect your data along with the
              terms that govern the use of our services.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section
        className="w-full -mt-24 sm:-mt-30 lg:-mt-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/BG.png')" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-20 space-y-16">

          {/* ================= PRIVACY POLICY ================= */}
          <div>
            <h2 className="text-3xl font-semibold mb-8">
              Privacy Policy
            </h2>

            <div className="grid gap-6">
              <PolicyCard
                title="Information We Collect"
                list={[
                  "Name, email, phone number",
                  "Project information",
                  "Usage data and cookies",
                ]}
              />

              <PolicyCard
                title="How We Use Information"
                list={[
                  "Provide and improve services",
                  "Communication",
                  "Improve user experience",
                ]}
              />

              <PolicyCard
                title="Data Security"
                text="We implement technical and organizational safeguards to protect your data."
              />

              <PolicyCard
                title="Cookies & Analytics"
                text="Cookies help understand user behavior and improve performance."
              />

              <PolicyCard
                title="Third-Party Services"
                text="We may use hosting, analytics, CRM, marketing and payment providers."
              />

              <PolicyCard
                title="Data Retention"
                text="Data is retained only when required and then securely deleted."
              />
            </div>
          </div>

          {/* ================= TERMS ================= */}
          <div>
            <h2 className="text-3xl font-semibold mb-8">
              Terms & Conditions
            </h2>

            <div className="grid gap-6">
              <PolicyCard
                title="Introduction"
                text="By using our website and services you agree to these terms."
              />

              <PolicyCard
                title="Use of Website"
                list={[
                  "Use services lawfully",
                  "No unauthorized access",
                  "No copying without permission",
                ]}
              />

              <PolicyCard
                title="Intellectual Property"
                text="All designs, code, and materials belong to Wheedle Technologies."
              />

              <PolicyCard
                title="Client Responsibilities"
                list={[
                  "Provide accurate information",
                  "Use solutions lawfully",
                ]}
              />

              <PolicyCard
                title="Limitation of Liability"
                text="We are not liable for indirect damages or downtime."
              />

              <PolicyCard
                title="Confidentiality"
                text="Client information is treated as confidential."
              />

              <PolicyCard
                title="Termination"
                text="Services may be suspended if terms are violated."
              />

              <PolicyCard
                title="Changes"
                text="Terms may change over time."
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;