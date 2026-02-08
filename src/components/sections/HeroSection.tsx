"use client";

import { motion } from "framer-motion";
import { useRotatingText } from "@/hooks/useRotatingText";
import { HERO_ROTATING_ITEMS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const { item, isVisible } = useRotatingText(HERO_ROTATING_ITEMS, 3500);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Rotating question + punchline */}
          <div className="flex h-[10rem] flex-col items-center justify-center sm:h-[11.5rem] md:h-[13rem]">
            <motion.p
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -8,
              }}
              transition={{ duration: 0.35 }}
              className="text-3xl font-extrabold sm:text-4xl md:text-6xl"
              style={{ color: item.color }}
            >
              &ldquo;{item.question}&rdquo;
            </motion.p>

            <motion.h1
              key={item.punch}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -6,
              }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="mt-5 text-xl font-bold text-warm-gray-800 sm:text-2xl md:text-4xl"
            >
              {item.punch}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg font-semibold text-warm-gray-700 sm:text-xl md:text-2xl"
          >
            사장님의 알잘딱깔센 AI 주문상담 에이전트,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              오대리.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button asLink="#beta-signup" size="lg">
              웨이팅리스트 등록
            </Button>
            <Button asLink="#how-it-works" variant="secondary" size="lg">
              어떻게 작동하나요?
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background gradient decoration */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}
