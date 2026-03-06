import React from "react";
import Header from "../components/Header";
import AboutHero from "../components/AboutHero";
import AboutWhyChoose from "../components/AboutWhyChoose";
import AboutMedia from "../components/AboutMedia";
// import AboutCEO from "../components/AboutCEO";
// import AboutTeam from "../components/AboutTeam";
// import AboutTeamMore from "../components/AboutTeamMore";
// import AboutTestimonials from "../components/AboutTestimonials";
import AboutCTA from "../components/AboutCTA";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/BG.png')",
        }}
      >
        <AboutHero />
        <AboutWhyChoose />
        <AboutMedia />
        {/* <AboutCEO /> */}
        {/* <AboutTeam /> */}
        {/* <AboutTeamMore /> */}
        <Newsletter
          content={{
            titleLine1: "Let's Build",
            titleLine2Primary: "",
            titleLine2Secondary: "Something Great Together",
            description: (
              <>
                Speak with our experts to explore our autonomous{" "}
                <br className="hidden md:block" /> platforms and intelligent
                agents, and discover the right AI-driven solution for your
                business needs.
              </>
            ),
            inputType: "tel",
            inputPlaceholder: "+91 254 568 XXXX",
            buttonText: "Request a Call",
            successMessage:
              "Your contact is successfully registered for newsletter",
          }}
        />
        {/* <AboutCTA /> */}
        <Testimonials />
        {/* Black mask to hide glow */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-16 h-16 bg-black z-50 pointer-events-none"></div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;
