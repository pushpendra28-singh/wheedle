import React from "react";
import LogosData from "../jsondata/LogosData";

function AboutWhyChoose() {
 const features = [
  {
    
    title: " Client Centric Approach",
    description:
      "Backed by a team of passionate professionals, we keep our customers at the core of our services, making development decisions with clear transparency and communication.",
      highlight: true,
  },
  {
    
    title: "Unmatched Commitment",
    description:
      "Wheedle Technologies has built a name for itself with the end-to-end support from brainstorming ideas for 24/7 after-deployment customer support and beyond.",
    highlight: true,
  },
  {
    
    title: "Reliable Tech Partners",
    description:
      "We can be your IT partner, delivering solutions that help you gain a prominent name in the digital race with software and services tailored for your business",
    highlight: true,
  },
];


  return (
    <section className="w-full pb-20">
      <div className="w-full px-5">
        
        <div className="max-w-6xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Title */}
            <div>
              <h2 className="text-3xl lg:text-5xl font-Gautam text-white whitespace-nowrap">
                Why <span className="font-normal text-white/60">Choose Us</span>
              </h2>
            </div>

            {/* Description 1 */}
            <div>
              <p className="text-sm text-white leading-relaxed">
                We align AI agents, strategy, and execution to deliver solutions built around your business goals.
              </p>
            </div>

            {/* Description 2 */}
            <div>
              <p className="text-sm text-white leading-relaxed">
                 We focus on building long-term partnerships based on trust, collaboration, and sustained business growth.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
            key={index}
            style={{ animationDelay: `${index * 0.6}s` }}
             className={` group p-6 rounded-2xl border border-white/10 bg-[#040010] backdrop-blur-md
             float-animation transition-all duration-500 ease-out hover:-translate-y-4
             hover:scale-[1.03] hover:bg-[#2934E4] hover:shadow-[0_20px_40px_rgba(41,52,228,0.45)]

             ${feature.highlight ? "bg-gradient-to-br from-blue-900/40 via-blue-900/20 to-transparent": ""
             }
             `}
             >

                {/* Icon */}
               <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center">
               <img
               src={LogosData.iconabout}
               alt={feature.title}
               className="w-[52px] h-[52px] rounded-[40px] object-contain bg-[#171D7E] ring-1 ring-blue-400/30
               "
              />
              </div>



                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

export default AboutWhyChoose;
