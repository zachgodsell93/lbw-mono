import React from "react";
import { Features } from "@/components/sections/features";
import { BentoGrid } from "@/components/sections/bentogrid";
import { HeroLanding } from "@/components/sections/hero-landing";
import { Testimonials } from "@/components/sections/testimonials";
import { PreviewLanding } from "@/components/sections/preview-landing";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      {/* <Powered /> */}
      <BentoGrid />
      {/* <InfoLanding data={infos[0]} reverse={true} /> */}
      {/* <InfoLanding data={infos[1]} /> */}
      <Features />
      <Testimonials />
    </>
  );
}
