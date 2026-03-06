import React, { useState, useEffect } from "react";
import Button from "../components/Button_x";
import LogosData from "../jsondata/LogosData";
import API_BASE_URL from "../config/api";

const CurrentOpenings = ({ onStartNowClick }) => {
  const [jobs, setJobs] = useState([]);

  // fetch jobs from backend
  useEffect(() => {

    fetch(`${API_BASE_URL}/jobs/`)

      .then((res) => res.json())

      .then((data) => {

        setJobs(data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);



  // const jobs = [
  //   {
  //     title: "Graphic Designer",
  //     location: "On Site",
  //     desc: "We are looking for a Graphic Designer who can create visually compelling designs for our assets aligned with brand guidelines and marketing objectives.",
  //     img: "ui.png",
  //   },
  //   {
  //     title: "Full Stack Developer",
  //     location: "On Site",
  //     desc: "We are looking for a Full Stack Developer to design, develop, and maintain end-to-end web applications across frontend and backend layers with database integrations.",
  //     img: "frontend.png",
  //   },
  //   {
  //     title: "Senior Digital Marketer",
  //     location: "On Site",
  //     desc: "We are looking for a Senior Digital Marketer who can strategically plan and execute digital marketing campaigns across channels.",
  //     img: "digital.png",
  //   },
  //   {
  //     title: "IT Sales Manager ",
  //     location: "On Site",
  //     desc: "We are looking for someone with expertise in driving IT service sales by identifying opportunities, building client relationships, and managing the complete sales cycle.",
  //     img: "hr.png",
  //   },
  //   // {
  //   //   title: "App Developer",
  //   //   location: "On Site",
  //   //   desc: "We are looking for an App Developer to design, develop, and maintain mobile applications with scalable architecture, secure integrations, and performance.",
  //   //   img: "backend.png",
  //   // },
  //   // {
  //   //   title: "Sr. Project Manager",
  //   //   location: "On Site",
  //   //   desc: "We are looking for a Project Manager who can oversee the team with end-to-end project planning and execution to ensure on-time delivery and quality outcomes.",
  //   //   img: "project.png",
  //   // },
  // ];

  return (
    <>
      <section className="w-full px-6 sm:px-10 lg:px-[100px] py-20  relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          {/* Heading */}
          <h2 className="font-gotham font-normal  text-white  text-[36px] sm:text-[44px] lg:text-[53px]  leading-[48px] lg:leading-[63px] animate-bounce">
            Current Openings
          </h2>

          {/* Sub text */}
          <p className="font-inter font-medium text-white text-[16px] leading-[26px] mt-3">
            We’re currently hiring for the following roles:
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-[#0E1228] rounded-[30px] h-[550px] flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(41,52,228,0.35)]
              "
              >
                {/* Image */}
                <img
                  src={`${API_BASE_URL}/uploads/${job.image}/`}
                  alt={job.title}
                  className="w-full h-[260px] object-cover"
                />

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3 bg-[#0B0F1A]">
                  {/* Location */}
                  <span className="font-inter font-normal text-[12px] leading-[22px] text-[#2934E4]">
                    {job.jobType}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-gotham font-normal text-white text-[24px] lg:text-[28px] leading-[32px] lg:leading-[38px]
                  sm:whitespace-nowrap"
                  >
                    {job.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter font-normal text-[14px] leading-[24px] text-white">
                    {job.description}
                  </p>

                  {/* Button */}

                  <Button
                    size="md"
                    showArrow={true}
                    onClick={onStartNowClick}
                    className="mt-auto w-fit bg-white text-black text-[14px] font-medium rounded-full px-[19px] py-[9px] transition"
                    padding="12px 32px"
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/****************** / What We Look For Section **********************/}
      <section className="w-full px-6 sm:px-10 lg:px-[100px] py-24 relative overflow-hidden">
        {/* Background glow */}

        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-14">
            {/* LEFT IMAGE FRAME — EXACT 545 × 403 */}
            <div className="relative w-full lg:w-[545px] group">
              <div
                className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-[#0B2CC3] via-[#4F6BFF] to-[#0B2CC3] blur-[14px] opacity-60 
               transition-all duration-500 ease-out group-hover:opacity-90 group-hover:scale-105"
              />

              <div className="relative w-full aspect-[545/403] overflow-hidden rounded-[30px] border border-[#0B2CC3] shadow-[0_0_40px_rgba(11,44,195,0.45)]">
                <img
                  src={LogosData.careerimage}
                  alt="Team"
                  className="w-full h-full object-cover scale-120 transition-all duration-500 ease-out group-hover:scale-125"
                />
              </div>
            </div>

            {/* RIGHT CONTENT — EXACT WIDTH + GAP */}
            <div className="w-full lg:w-[645px] flex flex-col gap-[32px]">
              <div>
                <h2 className="font-gotham font-normal text-white text-[36px] sm:text-[44px] lg:text-[53px] leading-[48px] lg:leading-[63px]">
                  Qualities We <span className="text-white/70">Value</span>
                </h2>

                <p className="font-inter font-normal text-white text-[16px] leading-[26px] mt-1">
                  We believe in the character of our team members and hence
                  value:
                </p>
              </div>

              <ul className="space-y-1.5">
                {[
                  "Honesty, fairness, and respect in all interactions.",
                  "Readiness to take responsibilities and deliver on commitments.",
                  "Cooperating with the team and valuing diverse perspectives.",
                  "Showing curiosity, adaptability, and a commitment to professional growth.",
                  "Understanding client needs and delivering solutions that create value.",
                ].map((text, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 transition-transform
             duration-300 ease-out hover:translate-x-2"
                  >
                    <img src="icon.png" alt="icon" className="mt-1" />
                    <span className="font-inter font-normal text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-white">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentOpenings;
