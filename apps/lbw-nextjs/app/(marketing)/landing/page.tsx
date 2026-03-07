"use client";
import React from "react";
import { Features } from "@/components/sections/features";
import { BentoGrid } from "@/components/sections/bentogrid";
import { HeroLanding } from "@/components/sections/hero-landing";
import { Testimonials } from "@/components/sections/testimonials";
import { PreviewLanding } from "@/components/sections/preview-landing";
import { HeaderSection } from "@/components/shared/header-section";
import { infos } from "@/config/landing";
import InfoSection from "@/components/sections/info-section";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      {/* <Powered /> */}
      <HeaderSection
        title="Why Lay Back and Win"
        subtitle="We are a team of horse racing enthusiasts who are passionate about finding value in the market for everyone."
      />
      <InfoSection data={infos[0]} reverse />
      <InfoSection data={infos[1]} reverse={false} />
      <PricingCards />
      {/* <hr className="container" /> */}
      <PricingFaq />
      <BentoGrid />

      {/* <InfoLanding data={infos[0]} reverse={true} /> */}
      {/* <InfoLanding data={infos[1]} /> */}
      <Features />
      <Testimonials />
    </>
  );
}
