"use client";

import { useState, useEffect, useCallback } from "react";

export function useRotatingText<T>(items: readonly T[], intervalMs = 3500) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const rotate = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setIsVisible(true);
    }, 400);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(rotate, intervalMs);
    return () => clearInterval(timer);
  }, [rotate, intervalMs]);

  return { item: items[index], isVisible };
}
