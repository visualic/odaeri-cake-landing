"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: "default" | "white" | "primary" | "light";
}

const bgMap = {
  default: "",
  white: "bg-white",
  primary: "bg-primary text-white",
  light: "bg-primary-50",
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  bg = "default",
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} className={`${bgMap[bg]} ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
      >
        {children}
      </motion.div>
    </section>
  );
}
