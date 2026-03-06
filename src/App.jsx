import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import ServicePages from "./pages/ServicesPages";
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
// import PricingPage from "./pages/PricingPage";
import Career from "./pages/Career";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import Preloader from "./components/Preloader";
import WhebotPage from "./pages/WhebotPage";
import AnimatedCursor from "react-animated-cursor";
import NotFound from "./pages/NotFound";
import BlogDetails from "./components/Blog_preview";

// ✅ ADMIN IMPORTS
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [botMinimized, setBotMinimized] = useState(true);

  // ✅ detect admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  const openBot = () => {
    setBotMinimized(false);
  };

  // Scroll to top on route change (instant for better UX)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(6600 - elapsed, 0);

      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };

  return (
    <>
      {/* ✅ Disable cursor on admin */}
      {window.innerWidth > 768 && !isAdminRoute && (
        <AnimatedCursor
          innerSize={8}
          outerSize={30}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          innerStyle={{ backgroundColor: "#FFFFFF" }}
          outerStyle={{ backgroundColor: "#ffffff3b" }}
        />
      )}

      <AnimatePresence mode="wait">
        {/* ✅ Disable preloader on admin */}
        {loading && !isAdminRoute ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Preloader />
          </motion.div>
        ) : (
          <motion.div
            key={location.pathname}
            className="min-h-screen w-full"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage openBot={openBot} />} />
              <Route path="/our-services" element={<ServicesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/career" element={<Career />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/our-service/:serviceKey"
                element={<ServicePages />}
              />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* ✅ ADMIN ROUTES */}
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <NotFound />
                }
              />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Disable bot on admin */}
      {!loading && !isAdminRoute ? (
        <WhebotPage
          isMinimized={botMinimized}
          setIsMinimized={setBotMinimized}
        />
      ) : (
        ""
      )}
      
    </>
  );
}

export default App;




// import React, { useEffect, useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import ServicePages from "./pages/ServicesPages";
// import LandingPage from "./pages/LandingPage";
// import ServicesPage from "./pages/ServicesPage";
// import BlogPage from "./pages/BlogPage";
// import AboutPage from "./pages/AboutPage";
// // import PricingPage from "./pages/PricingPage";
// import Career from "./pages/Career";
// import ContactPage from "./pages/ContactPage";
// import PrivacyPolicy from "./pages/PrivacyPolicy";

// import Preloader from "./components/Preloader";
// import WhebotPage from "./pages/WhebotPage";
// import AnimatedCursor from "react-animated-cursor";

// import AdminLogin from "./admin/AdminLogin";
// import AdminDashboard from "./admin/AdminDashboard";
// import ProtectedRoute from "./admin/ProtectedRoute";

// function App() {
//   const location = useLocation();

//   const [loading, setLoading] = useState(true);
//   const [botMinimized, setBotMinimized] = useState(true);
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   const openBot = () => {
//     setBotMinimized(false);
//   };

//   // Scroll to top on route change (instant for better UX)
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   // Preloader timer
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 6200);

//     return () => clearTimeout(timer);
//   }, []);

//   // Page transition animation
//   const pageVariants = {
//     initial: { opacity: 0, x: 100 },
//     in: { opacity: 1, x: 0 },
//     out: { opacity: 0, x: -100 },
//   };

//   const pageTransition = {
//     type: "tween",
//     ease: "easeInOut",
//     duration: 0.5,
//   };

//   return (
//     <>
//       {/* Disable animated cursor on mobile */}
//       {window.innerWidth > 768 && !isAdminRoute && (
//         <AnimatedCursor
//           innerSize={8}
//           outerSize={30}
//           innerScale={1}
//           outerScale={2}
//           outerAlpha={0}
//           innerStyle={{ backgroundColor: "#FFFFFF" }}
//           outerStyle={{ backgroundColor: "#ffffff3b" }}
//         />
//       )}

//       <AnimatePresence mode="wait">
//         {loading && !isAdminRoute ? (
//           <motion.div
//             key="preloader"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Preloader />
//           </motion.div>
//         ) : (
//           <motion.div
//             key={location.pathname}
//             className="min-h-screen w-full"
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <Routes location={location}>
//               <Route path="/" element={<LandingPage openBot={openBot} />} />
//               <Route path="/services" element={<ServicesPage />} />
//               <Route path="/blog" element={<BlogPage />} />
//               <Route path="/about" element={<AboutPage />} />
//               <Route path="/career" element={<Career />} />
//               <Route path="/contact" element={<ContactPage />} />
//               <Route path="/service/:serviceKey" element={<ServicePages />} />
//               <Route path="/privacypolicy" element={<PrivacyPolicy />} />

//               <Route path="/admin/login" element={<AdminLogin />} />

//               <Route
//                 path="/admin/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* 404 Fallback */}
//               <Route
//                 path="*"
//                 element={
//                   <div className="flex items-center justify-center h-screen text-2xl">
//                     404 - Page Not Found
//                   </div>
//                 }
//               />
//             </Routes>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Bot stays persistent and does not re-animate */}
//       {/* {!loading ? (<WhebotPage
//         isMinimized={botMinimized}
//         setIsMinimized={setBotMinimized}
//       />
//       ) : ('')}; */}
//       {/* Hide bot on admin routes */}
//       {!loading && !location.pathname.startsWith("/admin") && (
//         <WhebotPage
//           isMinimized={botMinimized}
//           setIsMinimized={setBotMinimized}
//         />
//       )}
//     </>
//   );
// }

// export default App;
