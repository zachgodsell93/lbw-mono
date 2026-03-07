"use client";
import React from "react";
import { motion } from "framer-motion";
type Props = {
  children?: React.ReactNode;
};

export default function PageFade({ children }: Props) {
  return (
    <motion.div
      className="w-full"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
