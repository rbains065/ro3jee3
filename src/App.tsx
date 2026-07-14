import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import FreeHomepageDesign from "./pages/FreeHomepageDesign";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import DiscoveryCall from "./pages/DiscoveryCall";
import WebDesignServices from "./pages/WebDesignServices";
import WebsiteRedesign from "./pages/WebsiteRedesign";
import WebsiteMaintenance from "./pages/WebsiteMaintenance";
import IndustryLanding from "./pages/IndustryLanding";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

// Helper component to scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Custom animated wrapper inspired by motion-primitives
function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-primary">
      <Header />
      
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Routes>
              <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
              <Route path="/pricing" element={<AnimatedPage><Pricing /></AnimatedPage>} />
              <Route path="/free-homepage-design" element={<AnimatedPage><FreeHomepageDesign /></AnimatedPage>} />
              <Route path="/reviews" element={<AnimatedPage><Reviews /></AnimatedPage>} />
              <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
              <Route path="/discovery-call" element={<AnimatedPage><DiscoveryCall /></AnimatedPage>} />
              <Route path="/web-design-services" element={<AnimatedPage><WebDesignServices /></AnimatedPage>} />
              <Route path="/website-redesign" element={<AnimatedPage><WebsiteRedesign /></AnimatedPage>} />
              <Route path="/website-maintenance" element={<AnimatedPage><WebsiteMaintenance /></AnimatedPage>} />
              <Route path="/websites-for-:industry" element={<AnimatedPage><IndustryLanding /></AnimatedPage>} />
              <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
              <Route path="/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
              
              {/* Fallback redirect or 404 handler */}
              <Route path="*" element={<AnimatedPage><Home /></AnimatedPage>} />
            </Routes>
          </div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
