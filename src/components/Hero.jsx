import React, { useState, useEffect } from "react"; // ✅ useState added
import axios from "axios"; // ✅ axios added
import { Link } from "react-router-dom";
import Button from "../components/Button_x";
import { motion } from "framer-motion";
import ContactPage from "../pages/ContactPage";
import API_BASE_URL from "../config/api"; // ✅ API_BASE_URL added

import Badge from "./Badge";
import LogosData from "../jsondata/LogosData";

function Hero({ openBot }) {
  const [openContact, setOpenContact] = useState(false);
  const [heroData, setHeroData] = useState({
    badge: "",
    heading: "",
    description: "",
  });

  useEffect(() => {
    axios

      .get(`${API_BASE_URL}/hero`)

      .then((res) => {
        if (res.data) {
          setHeroData(res.data);
        }
      });
  }, []);

  return (
    <section
      className="
    relative w-full
    pt-24 pb-12
    sm:pt-28 sm:pb-16
    md:pt-32 md:pb-20
    lg:pt-40 lg:pb-24
    xl:pt-44 xl:pb-28
    h-full
    border-0
    mt-6
  "
      style={{
        background: `
      radial-gradient(circle at center, rgba(90,108,255,0.35), transparent 60%),
      linear-gradient(
        180deg,
        #000000 5%,
        #000000 10%,
        #0f1c5c 25%,
        #3f5efb 40%,
        #1a237e 60%,
        #020617 100%
      )
    `,
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/BGImage.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        {/* <Badge text="Autonomous Marketing & Digital Solutions" /> */}
        <Badge text={heroData.badge} />
        {/* Heading */}
        <motion.h1
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
                    text-[30px]
                    sm:text-[30px] 
                    md:text-[40px] 
                    lg:text-[45px] 
                    xl:text-[55px] 
                    font-semibold 
                    leading-[1.1] 
                    sm:leading-[1.15] 
                    text-white 
                    mb-4 
                    sm:mb-5 
                    md:mb-6 
                    lg:mb-7
                    px-2
                  "
        >
          {/* Tailoring Customized Intelligent AI Agents
          <br /> for Marketing,Growth & Automation */}
          {heroData.heading}
        </motion.h1>

        {/* Description */}
        <p
          className="
          text-[12px] 
          sm:text-[10px] 
          md:text-[14px] 
          lg:text-[15px] 
          xl:text-[16px] 
          text-white
          leading-[1.7] 
          lg:leading-[1.8] 
          mb-8 
          sm:mb-9 
          md:mb-10 
          lg:mb-12 
          max-w-[90%] 
          sm:max-w-[540px] 
          md:max-w-[650px] 
          lg:max-w-[750px]
          px-2
          font-normal
        "
        >
          {/* From Intelligent Automation Engines to AI Marketing Ecosystems,
          Wheedle Technologies deliver a full spectrum of Digital Services. */}
          {heroData.description}
        </p>

        {/* Buttons */}
        <div
          className="
          flex flex-col 
          sm:flex-row 
          items-center 
          justify-center
          gap-4 
          sm:gap-5 
          lg:gap-6 
          mb-10 
          sm:mb-12 
          md:mb-14 
          lg:mb-16
          w-full 
          sm:w-auto
        "
        >
          <Link
            className="
              inline-flex items-center justify-center gap-3
              w-full 
              sm:w-auto 
              px-6 
              sm:px-9 
              md:px-10 
              lg:px-11
              h-[54px] 
              sm:h-[56px] 
              lg:h-[60px] 
              bg-gradient-to-l
              from-[#1131c8]
              via-[#4b6bfd]
              to-[#1131c8]
              bg-linear
              text-white 
              text-[15px] 
              sm:text-[16px] 
              lg:text-[17px] 
              font-medium 
              rounded-full 
              hover:bg-[#2563eb]
              transition-all
              shadow-md
              shadow-neutral-600
              max-w-[400px]
              sm:max-w-none
              hover:bg-gradient-to-r
              hover:from-[#1131c8]
              hover:via-[#212ba9]
              hover:to-[#212ba9]
              border-2 border-blue-300
            "
            onClick={() => setOpenContact(true)}
          >
            <img src="/GetFree.png" />
            Unlock Your Free Consultation
          </Link>

          <div className="w-full sm:w-auto max-w-[400px] sm:max-w-none">
            <Button padding="28px" onClick={openBot}>
              Chat with Our AI Assistant
            </Button>
          </div>
        </div>
        {/* ================= CONTACT MODAL ================= */}
        {openContact && (
          <ContactPage
            onClose={() => setOpenContact(false)}
            title="Unlock Your Free Consultation"
            description=""
            contactEmail="info@wheedletechnologies.ai"
            contactPhone="+91 9717672561"
            messagePlaceholder="Tell us your message"
          />
        )}

        {/* Hero Image */}
        <div
          className="
          relative w-full 
          max-w-[9000px] 
          lg:max-w-[1000px] 
          xl:max-w-[1100px]
          px-0
          mt-[-1%]
          mb-[-6%]
        "
        >
          <img
            // src="/Dashboard.png"
            src={LogosData.dashboard}
            alt="Digital Solutions"
            className="
                 w-full h-full   /* important */
      object-cover    /* important */
      rounded-xl 
      sm:rounded-2xl 
      lg:rounded-3xl
      
            "
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
