import React from "react";
import Badge from "./Badge";

function AboutHero() {
  return (
    <section className="w-full h-full flex justify-center mt-[-2%]">
      <div className="relative w-full max-w-[1440px] min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh]">

        {/* Frame Image */}
        <img
          src="/frame-image.png"
          alt="Frame"
          className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:translate-y-6"
        />

        {/* Content */}
        <div
          className="
            relative z-10 w-full h-full
            flex flex-col items-center justify-center
            px-5 sm:px-8
            text-white text-center
            gap-6

            /* KEEP POSITION SAME AS IMAGE */
            -translate-y-6 sm:-translate-y-10 lg:-translate-y-14 lg:mt-8

            pt-32 sm:pt-39 lg:pt-20
            pb-32 sm:pb-39 lg:pb-0
          "
        >
          {/* Badge */}
          <Badge text="ABOUT" margin="" />

          {/* Title */}
          <h1 className="font-gotham font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-tight lg:leading-[52px] max-w-[900px]">
            Visionaries of AI Agents, Agentic Platforms & Digital Innovation
          </h1>

          {/* TEXT SCROLL AREA */}
          <div
            className="
                    max-w-[900px]
                    h-[2.8em] sm:h-[3.2em] lg:h-[3.5em]
                    overflow-y-auto
                    px-2
                    scrollbar-hide
                    "
          >
            <p className="font-inter font-medium text-sm sm:text-[15px] lg:text-base leading-relaxed">
             We are a dedicated professional front committed to delivering scalable IT solutions, AI Agents, and Agentic Platforms that support your vision & help your business grow.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutHero;
