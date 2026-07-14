import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import Portfolio from "./pages/Portfolio";
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-background font-sans text-primary">
        <Header />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/free-homepage-design" element={<FreeHomepageDesign />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/discovery-call" element={<DiscoveryCall />} />
            <Route path="/web-design-services" element={<WebDesignServices />} />
            <Route path="/website-redesign" element={<WebsiteRedesign />} />
            <Route path="/website-maintenance" element={<WebsiteMaintenance />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/websites-for-:industry" element={<IndustryLanding />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Fallback redirect or 404 handler */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
