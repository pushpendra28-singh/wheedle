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
import OurStory from "../components/OurStory";
import WhatWeDo from "../components/WhatWeDo";
import WhyWheedle from "../components/WhyWheedle";
import SEO from "../components/SEO";
// import ServicesMission from "../components/ServicesMission";

function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <SEO
        title="About Wheedle Technologies | AI Solutions Experts"
        description=" Learn about Wheedle Technologies, our mission, AI expertise, and how we deliver smart automation, custom AI development, and innovative solutions worldwide."
        url="https://wheedletechnologies.ai/about"
      />
      <Header />
      <div
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/BG.png')",
        }}
      >
        <AboutHero />
        <AboutWhyChoose />
        <OurStory
          title="Our Story"
          description="Our journey started with a simple goal — to help businesses leverage technology to solve real-world problems. Over time, we have grown into a technology partner for companies looking to innovate, automate, and scale their operations.
We believe that technology should not be complicated. Our mission is to simplify digital transformation by creating solutions that are reliable, scalable, and easy to use."
          image="/story.png"
          reverse={false}
        />
        <AboutMedia />
        <WhyWheedle />
        {/* <AboutCEO /> */}
        {/* <AboutTeam /> */}
        {/* <AboutTeamMore /> */}
        <OurStory
          title="Our Mission"
          description="To simplify technology adoption by delivering powerful, scalable, and cost-efficient digital
and AI solutions that accelerate business growth and elevate customer experiences.
Not every organization requires an in-house IT department, but every organization requires
exceptional technology leadership. Wheedle Technologies fulfills that role as your
outsourced technology, automation, and growth partner- ensuring digital systems,
customer engagement, and business operations work seamlessly together."
          image="/story.png"
          reverse={true}
        />

        <OurStory
          title="Our Vision"
          description="To be the world’s most trusted digital transformation and intelligent automation partner for
non-IT enterprises - empowering them to compete, scale, and succeed through connected
technology ecosystems."
          image="/story.png"
          reverse={false}
        />

        <WhatWeDo />
        {/* 
        <ServicesMission 
      title1="What We Do"
     
      description="We specialize in designing and developing digital solutions tailored to business needs."

      /> */}

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
