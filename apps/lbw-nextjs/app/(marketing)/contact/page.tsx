import ContactForm from "@/components/shared/contact-form";
import { HeaderSection } from "@/components/shared/header-section";
import React from "react";

type Props = {};

function Contact({}: Props) {
  return (
    <div className="flex flex-col w-full justify-center align-middle items-center gap-16 py-8 md:py-8">
      <HeaderSection
        title="Contact Us"
        subtitle="Fill out the form below and well get back to you as soon as possible."
      />
      <ContactForm />
    </div>
  );
}

export default Contact;
