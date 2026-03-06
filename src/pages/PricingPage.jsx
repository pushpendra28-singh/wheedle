import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Button from '../components/Button_x'
function PricingPage() {
  return (
    <div className="w-full min-h-screen">
      <Header />

      {/* Coming Soon Section */}
      <section className="w-full min-h-[70vh] flex items-center justify-center pt-32 sm:pt-36 lg:pt-40 py-20">
        <div className="w-full px-5 lg:px-48 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-[#0B2CC3]/30 bg-[#0B2CC3]/30 backdrop-blur-xs text-sm font-medium tracking-wider text-white mb-8">
            PRICING
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white mb-6">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-white leading-relaxed mb-10 max-w-2xl">
            We're working hard to bring you the best pricing plans tailored to your business needs.
            Stay tuned for competitive packages that deliver real value.
          </p>

          {/* Animated Dots */}
          <div className="flex gap-2 mb-10">
            <span className="w-3 h-3 bg-[#002EFF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-3 h-3 bg-[#002EFF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-3 h-3 bg-[#002EFF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col sm:flex-row gap-4 justify-center">
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
            >
              Contact Us for Custom Quote
            </Link>
            <Link
              to="/"
            >
              <div className="w-full sm:w-auto max-w-[400px] sm:max-w-none">
                <Button padding="28px">Back to home</Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PricingPage;
