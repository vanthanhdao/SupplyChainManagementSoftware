"use client";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";

export default function MarketingPage() {
  return (
    <div>
      <Hero />
      <div>
        {/* <LogoCollection /> */}
        <Divider />
        {/* <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider /> */}
      </div>
    </div>
  );
}
