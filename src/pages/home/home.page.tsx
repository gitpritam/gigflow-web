import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedGigsSection from "@/components/home/FeaturedGigsSection";
import WhyGigFlowSection from "@/components/home/WhyGigFlowSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";
import { useAuthStore } from "@/store";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-page">
      <Navbar
        isLoggedIn={isAuthenticated}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection />
      <HowItWorksSection />
      <FeaturedGigsSection />
      <WhyGigFlowSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
