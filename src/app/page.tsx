"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import IntroductionSection from "@/components/sections/home/IntroductionSection";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import WhyEdifySection from "@/components/sections/home/WhyEdifySection";
import ChairmanTransitionToCta from "@/components/sections/home/ChairmanTransitionToCta";
import LandingLoader from "@/components/ui/LandingLoader";
import { ScrollStory } from "@/components/ScrollStory";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      // Only play the loader animation if we are at the top of the page (Hero section)
      if (scrollPos < 100) {
        setShowLoader(true);
      } else {
        setIsLoaded(true);
      }
    }
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setIsLoaded(true);
  };

  return (
    <>
      {showLoader && <LandingLoader key="loader" onComplete={handleLoaderComplete} />}
      <HeroSection key="hero" isParentReady={isLoaded} />
      {/* <IntroductionSection /> */}
      <ScrollStory key="scrollstory" />
      <ServicesOverviewSection key="services" />
      <WhyEdifySection key="why" />
      <ChairmanTransitionToCta key="chairman" />
    </>
  );
}
