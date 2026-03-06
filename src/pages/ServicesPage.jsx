import Header from "../components/Header";
import ServicesHero from "../components/ServicesHero";
import ServicesBento from "../components/ServicesBento";
import ServiceOfferings from "../components/ServiceOfferings";
import ServicesMission from "../components/ServicesMission";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Businesses from "../components/Businesses";
import Newsletter from "../components/Newsletter";
function ServicesPage() {
  return (
    <div className="w-full min-h-screen">
      <Header />
        <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/BG.png')",
        }}>
      <ServicesHero />
    
      <ServicesBento />
      <ServiceOfferings />
      <ServicesMission />
      {/* <ServicesCTA /> */}
      <Newsletter
        content={{
          titleLine1: "Let's Build",
          titleLine2Primary: "",
          titleLine2Secondary: "Something Great Together",
          description: (
            <>
              Speak with our experts to explore our autonomous  <br className="hidden md:block" /> platforms and intelligent agents, and discover the right AI-driven solution for your business needs.
            </>),
          inputType: "tel",
          inputPlaceholder: "+91 254 568 XXXX",
          buttonText: "Request a Call",
          successMessage: "Your contact is successfully registered for newsletter",
        }}
      />
      <Businesses />
      <Testimonials />
      <Footer />
      </div>
    </div>
  );
}

export default ServicesPage;
