"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  text: string,
  enabled: boolean,
  charDelayMs = 60,
) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      setDone(false);
      indexRef.current = 0;
      return;
    }

    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const timer = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(timer);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, charDelayMs);

    return () => clearInterval(timer);
  }, [text, enabled, charDelayMs]);

  return { displayed, done };
}
