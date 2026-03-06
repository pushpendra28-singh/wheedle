import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Vision from "../components/Vision";
import Steps from "../components/Steps";
import Features from "../components/Features";
import Businesses from "../components/Businesses";
import Newsletter from "../components/Newsletter";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function LandingPage({ openBot }) {
  return (
    <>
      <Header />
      <Hero openBot={openBot} />
      <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Main_BG.jpg')",
        }}>

        <Partners />
        <Vision />
        <Steps />
        <Features />
        <Businesses />
        <Newsletter
          content={{
            titleLine1: "Stay Ahead in the AI-Driven World:",
            titleLine2Primary: "Latest Insights & ",
            titleLine2Secondary: "Updates",
            description: (
              <>
                Stay updated with the latest in AI platforms, autonomous systems, agentic marketing,  <br className="hidden md:block" /> and digital innovation—delivered straight to your inbox.
              </>),
            inputType: "email",
            inputPlaceholder: "Enter your email",
            buttonText: "Get The Tech Brief",
            successMessage: "Your contact is successfully registered for newsletter",
          }}
        />
        <Testimonials />
        <Footer />
      </div>
    </>

  );
}

export default LandingPage;
