import LetterFromFounder from "@/components/sections/LetterFromFounder";
import InfoSection from "@/components/sections/info-section";
import { HeaderSection } from "@/components/shared/header-section";
import { infos } from "@/config/landing";
import React from "react";

type Props = {};

export default function About({}: Props) {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-y-10">
        <HeaderSection
          title="About Us"
          subtitle="We are a team of horse racing enthusiasts who are passionate about finding value in the market for everyone."
        />
        <InfoSection data={infos[0]} reverse />
        <InfoSection data={infos[1]} reverse={false} />
      </div>
    </div>
  );
}
